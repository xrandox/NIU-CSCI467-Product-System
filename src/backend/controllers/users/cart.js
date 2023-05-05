/**
 * This file provides database functions for a users cart
 */

const Cart = require("../../models/Cart");
const mongoose = require("mongoose");
const { removeInventory, addInventory } = require("../staff/inventory");

const addPartToCart = async (req, res, next) => {
  try {
    const id = req.auth.id;
    const { partNumber, quantity } = req.body.part;

    const haveInventory = await removeInventory(partNumber, quantity);
    if (!haveInventory) {
      return res.status(400).json({ error: "Not enough inventory available" });
    }

    var cart = await Cart.findOne({ customer: id });

    if (cart === null) {
      cart = await Cart.create({ customer: id });
    }

    const part = cart.parts.find((p) => p.partNumber === partNumber);
    if (part) {
      part.quantity += quantity;
      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    }

    cart.parts.push({ partNumber: partNumber, quantity: quantity });
    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const removePartFromCart = async (req, res, next) => {
  try {
    const id = req.auth.id;
    const { partNumber } = req.params;

    const cart = await Cart.findOne({ customer: id });

    if (!cart) {
      return res.status(400).json({ error: "Could not find users cart" });
    }

    const part = cart.parts.findIndex(
      (p) => p.partNumber.toString() === partNumber
    );

    if (part === -1) {
      return res.status(400).json({ error: "Part is not in the cart" });
    }

    const currentQuantity = cart.parts[part].quantity;

    const addedInventory = await addInventory(partNumber, currentQuantity);
    if (!addedInventory) {
      return res.status(500).json({ error: "Failed to unreserve item" });
    }

    cart.parts.splice(part, 1);

    const updatedCart = await cart.save();

    if (!updatedCart) {
      res.status(404).json({ error: "Could not update the cart" });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const editPartInCart = async (req, res, next) => {
  try {
    const id = req.auth.id;
    const { partNumber, quantity } = req.body.part;

    const cart = await Cart.findOne({ customer: id });
    const part = cart.parts.findIndex((p) => p.partNumber === partNumber);
    if (part === -1) {
      return res.status(400).json({ error: "Part is not in the cart" });
    }
    const cartQuantity = cart.parts[part].quantity;
    const changeInQuantity = quantity - cartQuantity;

    if (changeInQuantity > 0) {
      const haveInventory = await removeInventory(partNumber, changeInQuantity);
      if (!haveInventory) {
        return res
          .status(400)
          .json({ error: "Not enough inventory available" });
      }
    }
    if (changeInQuantity < 0) {
      const addedInventory = await addInventory(partNumber, -changeInQuantity);
      if (!addedInventory) {
        return res.status(500).json({ error: "Failed to unreserve item" });
      }
    }

    if (quantity === 0) {
      cart.parts.splice(part, 1);
    } else {
      cart.parts[part].quantity = quantity;
    }

    const updatedCart = await cart.save();

    if (!updatedCart) {
      res.status(500).json({ error: "Could not update the cart" });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getCart = async (req, res, next) => {
  try {
    const id = req.auth.id;
    var existingCart = await Cart.findOne({ customer: id });

    if (existingCart === null) {
      existingCart = await Cart.create({ customer: id });
    }

    return res.status(200).json(existingCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Empties the cart without unreserving items - Used to empty cart when the user submits an order
const emptyCart = async function (id) {
  try {
    const emptyCart = await Cart.findOneAndReplace(
      { customer: id },
      { customer: id, parts: [], subtotal: 0, weight: 0 },
      {
        new: true,
      }
    );
    if (!emptyCart) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  addPartToCart,
  removePartFromCart,
  editPartInCart,
  getCart,
  emptyCart,
};
