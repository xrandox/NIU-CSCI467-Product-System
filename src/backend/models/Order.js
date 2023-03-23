/**
 * This file contains the database model for an order
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderedProduct = require("./OrderedProduct");
const Address = require("./Address");

/**
 * This schema represents a single order
 */
const orderSchema = new Schema(
  {
    customer: { type: mongoose.Types.ObjectId, required: true, index: true },
    shippingAddress: { type: Address.schema, required: true },
    products: { type: [OrderedProduct.schema], required: true },
    total: { type: mongoose.Types.Decimal128, required: true },
    authorizationNumber: String,
    authorizationTimestamp: Date,
    status: {
      type: Number,
      default: 0, //-1 - Cancelled, 0 - Processing, 1 - Shipped, 2 - Delivered
      min: -1,
      max: 2,
    },
    shippedTimestamp: Date,
  },
  { timestamps: true }
);

// TODO: Function to create a user-facing JSON rather than returning the whole order object

module.exports = mongoose.model("Order", orderSchema);
