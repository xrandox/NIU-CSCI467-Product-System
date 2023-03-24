/**
 * Login passport. Used to validate login credentials with what we have on the server
 */

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/User");

// Define our local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]", // this field can contain email OR username, allowing the user to login using either
      passwordField: "user[password]",
    },
    async (email, password, done) => {
      try {
        // Try to find by email
        var user = await User.findOne({ email: email });

        // If can't, try by username
        if (!user) {
          user = await User.findOne({ username: email });
        }

        // If still cannot, username/email is invalid
        if (!user) {
          return done(null, false, { message: "Username/Email not found" });
        }

        // Otherwise validate password
        if (!user.validPassword(password)) {
          return done(null, false, { "error": "Invalid Credentials" });
        }

        // If good, return user
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
