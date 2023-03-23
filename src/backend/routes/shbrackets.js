/**
 * Shipping & Handling Bracket routes
 */

const express = require("express");
const {
  getBrackets,
  updateBracket,
  addBracket,
  deleteBracket,
} = require("../controllers/shbrackets");
const router = express.Router();
const auth = require("./auth");
const { requireAdmin } = require("./permissions");

// Get all S&H brackets
router.get("/", auth.required, requireAdmin, getBrackets);

// Update a single S&H bracket by id
router.patch("/:id", auth.required, requireAdmin, updateBracket);

// Delete a single S&H bracket by id
router.delete("/:id", auth.required, requireAdmin, deleteBracket);

// Add a new S&H bracket
router.post("/", auth.required, requireAdmin, addBracket);

module.exports = router;
