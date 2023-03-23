/**
 * This file contains the API routes for querying the profile system
 */

const express = require("express");
var auth = require("./auth");
const { getProfile, prepareProfile } = require("../controllers/profiles");
const router = express.Router();

// Prepare profile
router.param("username", prepareProfile);

// Get a single users profile 
// .. Do we need this? I think probably only admin need to access user profiles but idk
router.get("/:username", auth.optional, getProfile);

module.exports = router;
