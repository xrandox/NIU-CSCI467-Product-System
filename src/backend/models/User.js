/**
 * This file contains the database model for a user
 */

const mongoose = require("mongoose");
require("dotenv").config();
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const Schema = mongoose.Schema;
const Address = require("./Address");

// TODO: Required fields etc

/**
 * This schema represents a single user
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Must have a username"],
      match: [
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
        "invalid username",
      ],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Must have an email"],
      match: [/\S+@\S+\.\S+/, "invalid email"],
      index: true,
    },
    name: String,
    passwordHash: String,
    salt: String,
    role: { type: String, default: "user" },
    address: { type: Address.schema },
    orders: { type: [mongoose.Types.ObjectId] },
  },
  { timestamps: true }
);

// Validate that unique fields are indeed unique
userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

// Validates that the given password matches what is in the DB
userSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.passwordHash === hash;
};

// Generate our token
userSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

// Generate the authentication JSON
userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    privilegeLevel: this.role,
  };
};

// Generates the outward facing profile of a user
userSchema.methods.toPublicJSON = function () {
  return {
    username: this.username,
    name: this.name,
  };
};

module.exports = mongoose.model("User", userSchema);
