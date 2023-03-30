/**
 * This file contains the database model for an ordered part
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single ordered part within the order
 */
const selectedPartSchema = new Schema({
  partNumber: Number,
  quantity: Number,
});

module.exports = mongoose.model("SelectedPart", selectedPartSchema);
