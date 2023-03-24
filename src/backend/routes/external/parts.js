/**
 * Legacy Database Query Routes
 */

const express = require("express");
const { getParts, getPart } = require("../../controllers/external/parts");
const router = express.Router();

// Get a json list of all parts
router.get("/", getParts);

// Get a single part by id
router.get("/:partnumber", getPart);

module.exports = router;
