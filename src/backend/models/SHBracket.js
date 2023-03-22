/**
 * This file contains the database model for a bracket of the Shipping and Handling charges
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shBracketSchema = new Schema({
  minWeight: mongoose.Types.Decimal128,
  maxWeight: mongoose.Types.Decimal128,
  charge: mongoose.Types.Decimal128,
});

module.exports = mongoose.model("SHBracket", shBracketSchema);
