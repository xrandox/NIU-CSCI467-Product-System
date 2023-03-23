/**
 * This file contains the API routes for querying the legacy database
 */

const express = require("express");
const { getParts, getPart } = require("../../controllers/legacy/parts");
const auth = require("../auth");
const router = express.Router();

// Get a json list of all parts
router.get("/", getParts);

// Get a single part by id
router.get("/:id", getPart);

module.exports = router;
