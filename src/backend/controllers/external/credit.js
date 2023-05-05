/**
 * Connects with the credit card processing system
 */
const axios = require("axios");
const crypto = require("crypto");
const Order = require("../../models/Order");
const mongoose = require("mongoose");

/**
 * Submits the card information to the credit card processing system...if successful, returns the user-facing order details
 */
const submitCard = async (req, res, next) => {
  try {
    const { cc, name, exp, orderID } = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res.status(404).json({ error: "Order does not exist" });
    }

    const order = await Order.findById(orderID);

    if (!order) {
      return res
        .status(404)
        .json({ error: "Could not find order for transaction" });
    }

    var data = {
      vendor: "VE017-17",
      trans: crypto.randomUUID(), // for now
      cc: cc,
      name: name,
      exp: exp,
      amount: order.total.toString(),
    };

    if (order.authorizationNumber) {
      return res
        .status(400)
        .json({ error: "This order has already been paid for" });
    }

    const response = await axios.post(
      "http://blitz.cs.niu.edu/creditcard",
      data
    );

    if (response.data.errors) {
      return res.status(500).json({ error: response.data.errors });
    }

    order.addAuthorization(response.data.authorization);
    const orderJSON = await order.userOrderJSON();
    res.status(200).json(orderJSON);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  submitCard,
};
