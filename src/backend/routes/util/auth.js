/**
 * This file provides JWT authorization, with credentials either being optional and required
 * Allows us to have secure user and role validation
 */

require("dotenv").config();
var { expressjwt: jwt, UnauthorizedError } = require("express-jwt");
const secret = process.env.SECRET;

/**
 * Splits the token out of the header
 */
function getTokenFromHeader(req) {
  try {
    if (req.headers.authorization.split(" ")[0] === "Token") {
      return req.headers.authorization.split(" ")[1];
    }
  } catch (error) {
    return null;
  }
}

/**
 * Required auth needs to have some error handling for unauthorized
 */
function requireAuth(req, res, next) {
  jwt({
    secret: secret,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  })(req, res, function (err) {
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({ error: "User not logged in" });
    } else {
      next(err);
    }
  });
}

module.exports = {
  authRequired: requireAuth,
  authOptional: jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
};
