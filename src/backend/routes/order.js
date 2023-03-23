/**
 * User Order routes
 */

const express = require("express");
const { 
    selfOrder,
    selfOrders,
    addOrder
} = require("../controllers/order");
const auth = require("./auth");
const router = express.Router();

// Get a single order from self
router.get("/:id", auth.required, selfOrder);

// Get all orders from self
router.get("/", auth.required, selfOrders);

// Add a new order
router.post("/", auth.required, addOrder);

module.exports = router;