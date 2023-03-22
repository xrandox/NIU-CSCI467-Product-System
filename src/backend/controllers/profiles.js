/**
 * This file provides database functions for profiles that are then referenced by /routes/profiles.js
 */

const User = require("../models/User");
const mongoose = require("mongoose");

const prepareProfile = async (req, res, next, username) => {
  User.findOne({ username: username })
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }

      req.profile = user;

      return next();
    })
    .catch(next);
};

const getProfile = async (req, res, next) => {
  return res.json({ profile: req.profile.toPublicJSON() });
};

module.exports = {
  getProfile,
  prepareProfile,
};
