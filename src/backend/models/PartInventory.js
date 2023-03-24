/**
 * This file contains the database model for a parts inventory
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single part's inventory
 */
const partInventorySchema = new Schema({
  partNumber: {
    type: Number,
    required: true,
    index: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("PartInventory", partInventorySchema);
