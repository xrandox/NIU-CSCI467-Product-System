/**
 * This file provides database functions for orders that are then referenced by /routes/order.js
 */

const Order = require("../models/Order");
const mongoose = require("mongoose");
const Address = require("../models/Address");

// TODO: We should probably not return all the specifics of the order except to employees. Create a user facing json response in Order.js

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

  res.status(200).json(order);
};

const selfOrders = async (req, res, next) => {
  const orders = await Order.find({ customer: req.auth.id });

  res.status(200).json(orders);
};

const addOrder = async (req, res, next) => {
  var order = new Order();
  var address = new Address();

  order.customer = req.auth.id;
  order.total = req.body.order.total;
  address = req.body.order.shippingAddress;
  order.products = req.body.order.products;
  order.shippingAddress = address;

  order
    .save()
    .then(function () {
      return res.json({ order: order.toJSON() });
    })
    .catch(next);
};

module.exports = {
  selfOrder,
  selfOrders,
  addOrder,
};
