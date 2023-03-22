/**
 * This file provides JWT authorization, with both optional and required credentials
 */

require("dotenv").config();
var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.SECRET;

function getTokenFromHeader(req) {
  if (req.headers.authorization.split(" ")[0] === "Token") {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
};


module.exports = auth;
