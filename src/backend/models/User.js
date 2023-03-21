/**
 * This file contains the database model for a user
 */

const mongoose = require("mongoose");
require("dotenv").config();
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const Schema = mongoose.Schema;

/**
 * This schema represents a single user
 */
const userSchema = new Schema({
    username: { type: String, unique: true, required: [true, "Must have a username"], match: [ /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, 'invalid username'], index: true },
    email: { type: String, unique: true, required: [true, "Must have an email"], match: [ /\S+@\S+\.\S+/, "invalid email"], index: true },
    role: String,
    passwordHash: String,
    salt: String
}, {timestamps: true})

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.passwordHash === hash;
};

userSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret)
}

userSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        privilegeLevel: this.role
    };
};

module.exports = mongoose.model("User", userSchema);