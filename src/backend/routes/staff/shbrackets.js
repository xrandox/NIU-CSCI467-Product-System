/**
 * Shipping & Handling Bracket Routes
 */

const express = require("express");
const {
  getBrackets,
  updateBracket,
  addBracket,
  deleteBracket,
} = require("../../controllers/staff/shbrackets");
const router = express.Router();
const { authRequired } = require("../util/auth");
const { requireAdmin } = require("../util/permissions");

// Get all S&H brackets
router.get("/", authRequired, requireAdmin, getBrackets);

// Update a single S&H bracket by id
router.patch("/:id", authRequired, requireAdmin, updateBracket);

// Delete a single S&H bracket by id
router.delete("/:id", authRequired, requireAdmin, deleteBracket);

// Add a new S&H bracket
router.post("/", authRequired, requireAdmin, addBracket);

module.exports = router;
