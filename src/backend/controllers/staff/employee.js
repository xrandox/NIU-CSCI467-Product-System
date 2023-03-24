/**
 * This file provides database functions for employees
 */

const Order = require("../../models/Order");
const mongoose = require("mongoose");

/**
 * Returns a list of all orders
 */
const allOrders = async (req, res, next) => {
  const orders = await Order.find({});

  res.status(200).json(orders); // It's okay to return an empty array here (probably?)
};

/**
 * Searches for an order by its ID and returns it if found
 */
const getOrder = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  res.status(200).json(order);
};

/**
 * Searches for all orders belonging to a certain user
 */
const getUserOrders = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const orders = await Order.find({ customer: id });

  res.status(200).json(orders); // It's okay to return an empty array here (probably?)
};

/**
 * Finds an order by its ID and updates it with the given fields
 */
const updateOrder = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "Order does not exist" });
  }

  // only update fields that were actually passed...
  if (typeof req.body.order.status !== "undefined") {
    order.status = req.body.order.status;
  }
  // TODO: do the rest of the fields here

  return order
    .save()
    .then(function () {
      return res.json(order);
    })
    .catch(next);
};

module.exports = {
  allOrders,
  getOrder,
  updateOrder,
  getUserOrders,
};
