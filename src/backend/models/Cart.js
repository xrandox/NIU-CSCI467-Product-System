const mongoose = require("mongoose");
const {
  getPartDetails,
  getAllPartDetails,
} = require("../controllers/external/parts");
const Schema = mongoose.Schema;
const SelectedPart = require("./SelectedPart");

/**
 * This schema represents a users cart
 */
const cartSchema = new Schema({
  customer: { type: mongoose.Types.ObjectId, required: true, index: true },
  parts: { type: [SelectedPart.schema], required: true, default: [] },
  subtotal: { type: mongoose.Types.Decimal128, default: 0.0 },
  weight: { type: mongoose.Types.Decimal128, default: 0.0 },
});

cartSchema.pre("save", async function (next) {
  const parts = this.parts || [];
  var subtotal = 0;
  var weight = 0;

  if (parts === []) {
    this.subtotal = subtotal;
    this.weight = weight;
    next();
  }

  const allPartDetails = await getAllPartDetails();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const partDetails = allPartDetails.find(
      (p) => p.number === part.partNumber
    );
    subtotal += partDetails.price * part.quantity;
    weight += partDetails.weight * part.quantity;
  }

  this.subtotal = subtotal;
  this.weight = weight;

  next();
});

module.exports = mongoose.model("Cart", cartSchema);
