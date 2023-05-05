/**
 * Queries to the legacy parts database
 */
require("dotenv").config();
const mariadb = require("mariadb");
const PartInventory = require("../../models/PartInventory");

var cache = null;
var cacheExpiration = null;

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

const fetchAllDetails = async () => {
  let conn;

  try {
    conn = await pool.getConnection();
    var parts = await conn.query("SELECT * FROM parts");

    if (!parts) return null;

    return parts;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    if (conn) conn.release();
  }
};

const getDetails = async () => {
  /* Legacy db caching code
  * For the project, we aren't supposed to cache, so this is commented out
  * meaning that it will always fetch the latest details
  if (cache && cacheExpiration > new Date().getTime()) {
    return cache;
  } else {*/
  cache = await fetchAllDetails();
  //cacheExpiration = new Date().getTime + 30 * 60 * 1000;
  return cache;
  //}
};

/**
 * Get a list of all parts from the legacy database
 */
const getParts = async (req, res) => {
  try {
    const [parts, partInventory] = await Promise.all([
      getDetails(),
      PartInventory.find({}),
    ]);

    if (!parts) {
      return res.status(500).json({ error: "Error retrieving part details " });
    }
    if (!partInventory) {
      return res
        .status(500)
        .json({ error: "Error retrieving part inventory " });
    }

    // Here we are cross referencing the Part Inventory to populate the parts with quantities
    for (let i = 0; i < parts.length; i++) {
      const partNum = parts[i].number;
      const inv = partInventory.find((part) => part.partNumber === partNum);

      if (inv) {
        parts[i].quantityAvailable = inv.quantityAvailable;
      } else {
        // If the part doesn't have inventory, we should probably just create it and set it to 0

        const newInv = await PartInventory.create({
          partNumber: partNum,
          quantityTotal: 0,
          quantityAvailable: 0,
          quantityReserved: 0,
        });
        parts[i].quantityAvailable = newInv.quantityAvailable;
      }
    }

    return res.status(200).json(parts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

/**
 * Get a single part by ID from the legacy database
 */
const getPart = async (req, res) => {
  const { partNumber } = req.params;

  try {
    const [parts, partInv] = await Promise.all([
      getDetails(),
      PartInventory.findOne({ partNumber: partNumber }),
    ]);

    const part = parts.find((p) => p.number.toString() === partNumber);

    if (!part) {
      return res.status(404).json({ error: "Part does not exist" });
    }

    // If there is no part inventory for the part, we should create an inventory for that part
    if (!partInv) {
      partInv = await PartInventory.create({
        partNumber: partNumber,
        quantityTotal: 0,
        quantityAvailable: 0,
        quantityReserved: 0,
      });
    }

    part.quantityAvailable = partInv.quantityAvailable;
    return res.status(200).json({ part: part });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Internal function to get part details
const getPartDetails = async (partNumber) => {
  try {
    const [parts, partInv] = await Promise.all([
      getDetails(),
      PartInventory.findOne({ partNumber: partNumber }),
    ]);

    const part = parts.find((p) => p.number === partNumber);

    if (!part) {
      return null;
    }

    // If there is no part inventory for the part, we should create an inventory for that part
    if (!partInv) {
      partInv = await PartInventory.create({
        partNumber: partNumber,
        quantityTotal: 0,
        quantityAvailable: 0,
        quantityReserved: 0,
      });
    }

    part.quantityAvailable = partInv.quantityAvailable;
    return part;
  } catch (error) {
    return null;
  }
};

const getAllPartDetails = async () => {
  try {
    const [parts, partInventory] = await Promise.all([
      getDetails(),
      PartInventory.find({}),
    ]);

    // Here we are cross referencing the Part Inventory to populate the parts with quantities
    for (let i = 0; i < parts.length; i++) {
      const partNum = parts[i].number;
      const inv = partInventory.find((part) => part.partNumber === partNum);

      if (inv) {
        parts[i].quantityAvailable = inv.quantityAvailable;
      } else {
        // If the part doesn't have inventory, we should probably just create it and set it to 0

        const newInv = await PartInventory.create({
          partNumber: partNum,
          quantityTotal: 0,
          quantityAvailable: 0,
          quantityReserved: 0,
        });
        parts[i].quantityAvailable = newInv.quantityAvailable;
      }
    }
    return parts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getParts,
  getPart,
  getPartDetails,
  getAllPartDetails,
};
