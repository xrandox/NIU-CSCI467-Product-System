/**
 * This file contains the database model for an order
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SelectedPart = require("./SelectedPart");
const SHBracket = require("./SHBracket");
const Address = require("./Address");
const User = require("./User");
const {
  sendOrderConfirmation,
  sendOrderShipped,
} = require("../controllers/external/email");
const PartInventory = require("./PartInventory");
const bigdecimal = require("bigdecimal");

/**
 * This schema represents a single order
 */
const orderSchema = new Schema(
  {
    customer: { type: mongoose.Types.ObjectId, required: true, index: true },
    shippingAddress: { type: Address.schema, required: true },
    parts: { type: [SelectedPart.schema], required: true },
    subtotal: mongoose.Types.Decimal128,
    weight: mongoose.Types.Decimal128,
    shippingAndHandling: mongoose.Types.Decimal128,
    total: mongoose.Types.Decimal128,
    authorizationNumber: String,
    authorizationTimestamp: Date,
    status: {
      type: String,
      enum: [
        "Pending",
        "Awaiting Packaging",
        "Awaiting Shipping",
        "Shipped",
        "Complete",
        "Cancelled",
      ],
      default: "Pending",
    },
    shippedTimestamp: Date,
    shippedBy: String,
    fulfilledBy: String,
  },
  { timestamps: true }
);

orderSchema.methods.userOrderJSON = async function () {
  let uid = this.customer;
  const customer = await User.findById(uid);

  if (!customer) return { error: "Could not find customer!" };

  return {
    _id: this._id,
    customer: customer.name,
    shippingAddress: this.shippingAddress,
    parts: this.parts,
    total: this.total,
    status: this.status,
  };
};

// God i hate working with Decimal128
orderSchema.methods.calculateTotal = async function () {
  try {
    const weight = new bigdecimal.BigDecimal(this.weight.toString());
    const subtotal = new bigdecimal.BigDecimal(this.subtotal.toString());
    const brackets = await SHBracket.find({}).sort({ minWeight: 1 });
    const weightBracket = brackets.find((b) => {
      const min = new bigdecimal.BigDecimal(b.minWeight.toString());
      const max = new bigdecimal.BigDecimal(b.maxWeight.toString());
      const aboveMin = weight.compareTo(min);
      const belowMax = weight.compareTo(max);

      return aboveMin > 0 && belowMax < 0;
    });

    if (weightBracket) {
      const charge = new bigdecimal.BigDecimal(weightBracket.charge.toString());
      const total = subtotal.add(charge).toString();
      this.shippingAndHandling = weightBracket.charge;
      this.total = mongoose.Types.Decimal128(total);
    } else {
      // TODO: decide what to do here...for now i guess default to largest charge?
      const charge = new bigdecimal.BigDecimal(
        brackets[brackets.length - 1].charge.toString()
      );
      const total = subtotal.add(charge).toString();
      this.shippingAndHandling = brackets[brackets.length - 1].charge;
      this.total = mongoose.Types.Decimal128(total);
    }

    const updatedOrder = await this.save();

    return updatedOrder;
  } catch (error) {
    console.log(error); //probably should do something better here?
    return null;
  }
};

orderSchema.methods.addAuthorization = function (authNumber) {
  this.authorizationTimestamp = Date.now();
  this.authorizationNumber = authNumber;
  this.status = "Awaiting Packaging";
  sendOrderConfirmation(this);
};

orderSchema.methods.fulfillOrder = async function (workerID) {
  this.status = "Awaiting Shipping";
  this.fulfilledBy = workerID;

  // Take the parts out of inventory since they have been now added to the order
  for (let i = 0; i < this.parts.length; i++) {
    const part = this.parts[i];
    const partInventory = await PartInventory.findOne({
      partNumber: part.partNumber,
    });
    if (!partInventory) {
      console.log("Failed to update inventory");
      return this;
    }
    partInventory.quantityTotal -= part.quantity;
    partInventory.quantityReserved -= part.quantity;
    await partInventory.save();
  }
  return await this.save();
};

orderSchema.methods.shipOrder = function (workerID) {
  this.shippedTimestamp = Date.now();
  this.status = "Shipped";
  this.shippedBy = workerID;
  sendOrderShipped(this);
  return this.save();
};

module.exports = mongoose.model("Order", orderSchema);
