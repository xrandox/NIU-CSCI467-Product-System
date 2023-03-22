/**
 * This file contains the API routes for querying the profile system
 */

const express = require("express");
var auth = require("./auth");
const { getProfile, prepareProfile } = require("../controllers/profiles");
const router = express.Router();

router.param("username", prepareProfile);

router.get("/:username", auth.optional, getProfile);

module.exports = router;
