/**
 * Inventory Routes
 */

const express = require("express");
const {
  addPartInventory,
  updatePartInventory,
} = require("../../controllers/staff/inventory");
const { authRequired } = require("../util/auth");
const router = express.Router();
const { requireEmployee } = require("../util/permissions");

// Add a new part to inventory
router.post("/", authRequired, requireEmployee, addPartInventory);

// Update existing inventory
router.patch(
  "/:partNumber",
  authRequired,
  requireEmployee,
  updatePartInventory
);

module.exports = router;
