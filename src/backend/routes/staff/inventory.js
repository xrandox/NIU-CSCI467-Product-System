/**
 * Inventory Routes
 */

const express = require("express");
const {
  getAllInventory,
  getInventory,
  addPartInventory,
  //deletePartInventory,
  updatePartInventory,
} = require("../../controllers/staff/inventory");
const auth = require('../util/auth')
const router = express.Router();
const { requireEmployee } = require('../util/permissions');

// TODO: These should probably be split out into public product routes and employee inventory management routes
// May be easier for parts.js to just query the inventory when requested, then only inventory management here

router.get("/", getAllInventory);

router.get("/:partNumber", getInventory);

router.post("/", auth.required, requireEmployee, addPartInventory);

//router.delete("/:id", auth.required, requireEmployee, deletePartInventory);

router.patch("/:partNumber", auth.required, requireEmployee, updatePartInventory);

module.exports = router;
