
const express = require("express");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var auth = require("./auth");
const { getProfile, prepareProfile } = require('../controllers/profiles');
const router = express.Router();

router.param("username", prepareProfile);

router.get('/:username', auth.optional, getProfile);

module.exports = router;
