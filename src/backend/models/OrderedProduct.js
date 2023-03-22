/**
 * This file contains the database model for an order
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema represents a single ordered product within the order
 */
const orderedProductSchema = new Schema({
  productID: { type: mongoose.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
});

module.exports = mongoose.model("OrderedProduct", orderedProductSchema);
