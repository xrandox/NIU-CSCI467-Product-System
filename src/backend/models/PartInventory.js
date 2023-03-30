/**
 * This file contains the database model for a parts inventory
 */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

/**
 * This schema represents a single part's inventory
 */
const partInventorySchema = new Schema({
  partNumber: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  quantityReserved: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  quantityTotal: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

partInventorySchema.plugin(uniqueValidator, {
  message: "There is already inventory for this part",
});

partInventorySchema.pre("create", function (next) {
  this.quantityAvailable = this.quantityTotal - this.quantityReserved;
  next();
});

partInventorySchema.pre("save", function (next) {
  this.quantityAvailable = this.quantityTotal - this.quantityReserved;
  next();
});

module.exports = mongoose.model("PartInventory", partInventorySchema);
