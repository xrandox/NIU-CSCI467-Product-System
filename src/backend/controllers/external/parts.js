/**
 * Queries to the legacy parts database
 */
require("dotenv").config();
const mariadb = require("mariadb");
const PartInventory = require('../../models/PartInventory');

/**
 * Create a pool of connections for the legacy database
 */
const pool = mariadb.createPool({
  host: process.env.LEGACY_HOST,
  user: process.env.LEGACY_USER,
  password: process.env.LEGACY_PASSWORD,
  database: process.env.LEGACY_DATABASE,
  connectionLimit: 5,
});

/**
 * Get a list of all parts from the legacy database
 */
const getParts = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    var parts = await conn.query("SELECT * FROM parts");
    const partInventory = await PartInventory.find({});

    // Here we are cross referencing the Part Inventory to populate the parts with quantities
    for (let i = 0; i < parts.length; i++) {
      const partNum = parts[i].number;
      const inv = partInventory.find(part => part.partNumber === partNum);

      if (inv) {
        parts[i].quantity = inv.quantity;
      } else { // If the part doesn't have inventory, we should probably just create it and set it to 0
        
        const newInv = await PartInventory.create( { partNumber: partNum, quantity: 0 } );
        parts[i].quantity = newInv.quantity;
      }
    }

    res.status(200).json(parts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  } finally {
    if (conn) return conn.release();
  }
};

/**
 * Get a single part by ID from the legacy database
 */
const getPart = async (req, res) => {
    const { partNumber } = req.params;

    let conn;

    try {
        conn = await pool.getConnection();
        var [part] = await conn.query(`SELECT * FROM parts WHERE number = ${partNumber}`);
        
        if (!part) {
            res.status(404).json({ error: "Part does not exist" });
        } else {
            var [partInv] = await PartInventory.find({ partNumber: partNumber});

            // If there is no part inventory for the part, we should create an inventory for that part
            if (!partInv) {
              partInv = await PartInventory.create( {partNumber: partNumber, quantity: 0} );
            }
        
            part.quantity = partInv.quantity;
            res.status(200).json({ part: part});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    } finally {
        if (conn) return conn.release();
    }
}

module.exports = {
  getParts,
  getPart
};
