/**
 * Queries to the legacy parts database
 */
require("dotenv").config();
const mariadb = require("mariadb");

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


// TODO: It would probably make frontend simpler if we grabbed the part inventory and attached it to the responses here, somehow

/**
 * Get a list of all parts from the legacy database
 */
const getParts = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const parts = await conn.query("SELECT * FROM parts");
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (conn) return conn.release();
  }
};

/**
 * Get a single part by ID from the legacy database
 */
const getPart = async (req, res) => {
    const { partnumber } = req.params;
    let conn;

    try {
        conn = await pool.getConnection();
        const part = await conn.query(`SELECT * FROM parts WHERE number = ${partnumber}`);
        
        if (!part || part.length === 0) {
            res.status(404).json({ error: "Part does not exist" });
        } else res.status(200).json(part);
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
