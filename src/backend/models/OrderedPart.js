/**
 * This file contains the database model for an ordered part
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single ordered part within the order
 */
const orderedPartSchema = new Schema({
  partID: mongoose.Types.ObjectId,
  quantity: Number,
  price: mongoose.Types.Decimal128,
});

module.exports = mongoose.model("OrderedPart", orderedPartSchema);
