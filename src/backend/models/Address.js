/**
 * This file contains the database model for an address
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * A Schema representing an address
 * TODO: Validation?
 */
const addressSchema = new Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

module.exports = mongoose.model("Address", addressSchema);
