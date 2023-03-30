/**
 * This file provides database functions for users that are then referenced by /routes/user.js
 */

const User = require("../../models/User");
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
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body.user;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields are required", emptyFields: emptyFields });
  }

  try {
    const user = new User();

    user.username = username;
    user.email = email;
    user.setPassword(password);

    const result = await user.save();
    return res.json({ user: result.toAuthJSON() });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Checks provided login details against the saved credentials
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!password) {
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
        return res.json(user.toAuthJSON());
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
};

/**
 * Updates a user
 */
const updateUser = async (req, res, next) => {
  const { username, email, password, address, name } = req.body.user;
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.setPassword(password);
      }
      if (address) {
        user.address = address;
      }
      if (name) {
        user.name = name;
      }

      return user
        .save()
        .then(function () {
          return res.json({ user: user.toAdminJSON() });
        })
        .catch((error) => {
          return res.status(500).json({ error: error });
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
