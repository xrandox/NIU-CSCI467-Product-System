/**
 * This file contains the database model for a product
 * TODO: This may need changed to like "Inventory" or something, depending on how we handle the legacy DB
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single product in inventory
 */
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
