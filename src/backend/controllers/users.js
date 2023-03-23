/**
 * This file provides database functions for users that are then referenced by /routes/user.js
 */

const User = require("../models/User");
const passport = require("passport");

/**
 * Gets the current users authentication json by ID
 */
const getUser = async (req, res, next) => {
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};

/**
 * Registers a new user in the database
 * TODO: Add more registration fields?
 */
const registerUser = async (req, res, next) => {
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then(function () {
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};

/**
 * Checks provided login details against the saved credentials
 */
const loginUser = async (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
};

/**
 * Updates a user
 * TODO: Probably need to restrict what can be changed here, and allow admins a more powerful endpoint
 */
const updateUser = async (req, res, next) => {
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== "undefined") {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== "undefined") {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.role !== "undefined") {
        user.bio = req.body.user.role;
      }
      if (typeof req.body.user.password !== "undefined") {
        user.setPassword(req.body.user.password);
      }
      if (typeof req.body.user.address !== "undefined") {
        user.address = req.body.user.address;
      }
      if (typeof req.body.user.orders !== "undefined") {
        user.orders = req.body.user.orders;
      }

      return user.save().then(function () {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  updateUser,
};
