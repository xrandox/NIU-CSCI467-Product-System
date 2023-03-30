/**
 * Employee Routes
 */

const express = require("express");
const {
  allOrders,
  getOrder,
  updateOrder,
  getUserOrders,
  shipOrder,
  fulfillOrder,
} = require("../../controllers/staff/employee");
const { authRequired } = require("../util/auth");
const { requireEmployee } = require("../util/permissions");
const router = express.Router();

// Get all orders
router.get("/orders/", authRequired, requireEmployee, allOrders);

// Get all orders for a user
router.get("/user/orders/:id", authRequired, requireEmployee, getUserOrders);

// Get an order by ID
router.get("/orders/:id", authRequired, requireEmployee, getOrder);

// Update an existing order
router.patch("/orders/:id", authRequired, requireEmployee, updateOrder);

// Mark an order as fulfilled (packaged)
router.patch("/fulfill/:id", authRequired, requireEmployee, fulfillOrder);

// Mark an order as shipped
router.patch("/ship/:id", authRequired, requireEmployee, shipOrder);

module.exports = router;
