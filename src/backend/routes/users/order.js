/**
 * User Order Routes
 */

const express = require("express");
const {
  selfOrder,
  selfOrders,
  submitOrder,
} = require("../../controllers/users/order");
const { authRequired } = require("../util/auth");
const router = express.Router();

// Get a single order from self
router.get("/:id", authRequired, selfOrder);

// Get all orders from self
router.get("/", authRequired, selfOrders);

// Submit a new order
router.post("/", authRequired, submitOrder);

module.exports = router;
