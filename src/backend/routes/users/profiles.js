/**
 * User Profile Routes
 */

const express = require("express");
var auth = require("../util/auth");
const { getProfile, prepareProfile } = require("../../controllers/users/profiles");
const router = express.Router();

// Prepare profile
router.param("username", prepareProfile);

// Get a single users profile 
// .. Do we need this? I think probably only admin need to access user profiles but idk
router.get("/:username", auth.optional, getProfile);

module.exports = router;
