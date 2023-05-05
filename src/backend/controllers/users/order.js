/**
 * This file provides database functions for a users orders
 */

const Order = require("../../models/Order");
const mongoose = require("mongoose");
const Address = require("../../models/Address");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const { emptyCart } = require("./cart");

/**
 * Returns a single order by id, if that order customer is also the current user
 */
const selfOrder = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  if (req.auth.id != order.customer) {
    return res.status(403).json({ error: "Invalid Permissions" });
  }

  const json = await order.userOrderJSON();
  res.status(200).json(json);
};

/**
 * Returns all orders belonging to a single customer
 */
const selfOrders = async (req, res, next) => {
  const orders = await Order.find({ customer: req.auth.id });

  /** User not having any orders is technically not an error, so passing just an empty array is fine i think
  if (orders.length === 0) {
    return res.status(404).json({ error: "User has no orders" })
  }*/
  res.status(200).json(orders);
};

/**
 * Adds a new order from a customer
 */
const submitOrder = async (req, res, next) => {
  try {
    const id = req.auth.id;
    const { shippingAddress } = req.body.order;

    const [customer, cart] = await Promise.all([
      User.findById(id),
      Cart.findOne({ customer: id }),
    ]);

    if (!customer) {
      return res.status(400).json({ error: "Could not find current user" });
    }
    if (!cart) {
      return res
        .status(400)
        .json({ error: "Could not find current user's cart" });
    }
    if (cart.parts.length < 1) {
      return res.status(400).json({ error: "User's cart is empty" });
    }

    var order = await Order.create({
      customer: id,
      shippingAddress: shippingAddress,
      subtotal: cart.subtotal,
      parts: cart.parts,
      weight: cart.weight,
    });

    customer.orders.push(order._id);

    const updatedOrder = await order.calculateTotal();

    if (updatedOrder === null) {
      return res.status(500).json({ error: "Failed to calculate order total" });
    }

    const eCart = await emptyCart(id);
    customer.save();
    if (!eCart) {
      console.log("Failed to properly empty a cart after checkout");
    }
    return res.json({ order: updatedOrder.toJSON() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  selfOrder,
  selfOrders,
  submitOrder,
};
