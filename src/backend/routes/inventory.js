/**
 * Inventory routes
 */

const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/inventory");
const auth = require('./auth')
const router = express.Router();
const { requireEmployee } = require('./permissions');

// TODO: These should probably be split out into public product routes and employee inventory management routes

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", auth.required, requireEmployee, addProduct);

router.delete("/:id", auth.required, requireEmployee, deleteProduct);

router.patch("/:id", auth.required, requireEmployee, updateProduct);

module.exports = router;
