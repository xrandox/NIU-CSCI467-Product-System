/**
 * Connects with the credit card processing system 
 */
const axios = require("axios");
const crypto = require("crypto");
const Order = require("../../models/Order");

/**
 * Submits the card information to the credit card processing system...if successful, returns the user-facing order details
 */
const submitCard = async (req, res, next) => {

  try {
    var orderID = req.body.data.orderID; 
    var data = {
      vendor: "VE017-17",
      trans: crypto.randomUUID(), // for now
      cc: req.body.data.cc,
      name: req.body.data.name,
      exp: req.body.data.exp,
      amount: req.body.data.amount,
    };

    const response = await axios.post(
      "http://blitz.cs.niu.edu/creditcard",
      data
    );

    if (response.data.errors) {
      return res.status(500).json({ error: response.data.errors })
    }

    const order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({ error: "CRITICAL ERROR: Transaction went through but could not find order!"})
    }

    order.addAuthorization(response.data.authorization);
    const orderJSON = await order.userOrderJSON();
    res.status(200).json(orderJSON);

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  submitCard,
};
