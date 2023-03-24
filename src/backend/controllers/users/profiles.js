/**
 * This file provides database functions for profiles that are then referenced by /routes/profiles.js
 */

const User = require("../../models/User");

/**
 * Prepares a profile
 */
const prepareProfile = async (req, res, next, username) => {
  User.findOne({ username: username })
    .then(function (user) {
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      req.profile = user;

      return next();
    })
    .catch(next);
};

/**
 * Returns the public-facing information about a user
 */
const getProfile = async (req, res, next) => {
  return res.json({ profile: req.profile.toPublicJSON() });
};

module.exports = {
  getProfile,
  prepareProfile,
};
