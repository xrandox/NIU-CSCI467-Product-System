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
const auth = require("../util/auth");
const { requireAdmin } = require("../util/permissions");

// Get all S&H brackets
router.get("/", auth.required, requireAdmin, getBrackets);

// Update a single S&H bracket by id
router.patch("/:id", auth.required, requireAdmin, updateBracket);

// Delete a single S&H bracket by id
router.delete("/:id", auth.required, requireAdmin, deleteBracket);

// Add a new S&H bracket
router.post("/", auth.required, requireAdmin, addBracket);

module.exports = router;
