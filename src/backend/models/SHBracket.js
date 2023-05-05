/**
 * This file contains the database model for a bracket of the Shipping and Handling charges
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single shipping and handling bracket
 */
const shBracketSchema = new Schema({
  minWeight: mongoose.Types.Decimal128,
  maxWeight: mongoose.Types.Decimal128,
  charge: mongoose.Types.Decimal128,
});

module.exports = mongoose.model("SHBracket", shBracketSchema);
