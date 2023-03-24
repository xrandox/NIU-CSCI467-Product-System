/**
 * This file contains the database model for an order
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderedPart = require("./OrderedPart");
const Address = require("./Address");
const User = require("./User");

/**
 * This schema represents a single order
 */
const orderSchema = new Schema(
  {
    customer: { type: mongoose.Types.ObjectId, required: true, index: true },
    shippingAddress: { type: Address.schema, required: true },
    parts: { type: [OrderedPart.schema], required: true },
    total: { type: mongoose.Types.Decimal128, required: true },
    authorizationNumber: String,
    authorizationTimestamp: Date,
    status: {
      type: String,
      enum: ['Pending', 'Awaiting Packaging', 'Shipped', 'Complete', 'Cancelled'],
      default: 'Pending'
    },
    shippedTimestamp: Date,
  },
  { timestamps: true }
);

orderSchema.methods.userOrderJSON = async function () {
  let uid = this.customer;
  const customer = await User.findById(uid);

  if (!customer) return { error: "Could not find customer!"}

  return {
    customer: customer.name,
    shippingAddress: this.shippingAddress,
    parts: this.parts,
    total: this.total,
    status: this.status
  }
}

orderSchema.methods.addAuthorization = function (authNumber) {
  this.authorizationTimestamp = Date.now();
  this.authorizationNumber = authNumber;
  this.status = 'Awaiting Packaging'
  //TODO: send confirmation email?
}

orderSchema.methods.shipped = function (shippingNumber) {
  this.shippedTimestamp = Date.now();
  this.status = 'Shipped';
}

module.exports = mongoose.model("Order", orderSchema);
