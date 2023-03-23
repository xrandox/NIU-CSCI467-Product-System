/**
 * Queries to the legacy parts database
 */
require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.LEGACY_HOST,
  user: process.env.LEGACY_USER,
  password: process.env.LEGACY_PASSWORD,
  database: process.env.LEGACY_DATABASE,
  connectionLimit: 5,
});

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

const getPart = async (req, res) => {
    const { id } = req.params;
    let conn;

    try {
        conn = await pool.getConnection();
        const part = await conn.query(`SELECT * FROM parts WHERE number = ${id}`);
        
        if (!part) {
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
