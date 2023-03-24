/**
 * Employee Routes
 */

 const express = require("express");
 const { 
    allOrders,
    getOrder,
    updateOrder,
    getUserOrders
} = require("../../controllers/staff/employee");
const auth = require("../util/auth");
const { requireEmployee } = require("../util/permissions");
const router = express.Router();

// Get all orders
router.get("/orders/", auth.required, requireEmployee, allOrders);

// Get all orders for a user
router.get("/user/orders/:id", auth.required, requireEmployee, getUserOrders)

// Get an order by ID
router.get("/orders/:id", auth.required, requireEmployee, getOrder);

// Update an existing order
router.patch("/orders/:id", auth.required, requireEmployee, updateOrder);

module.exports = router;