/**
 * Admin Routes
 */

const express = require("express");
const auth = require("../util/auth");
const router = express.Router();
const {
  getUsers,
  spyUser,
  manageUser,
  deleteUser,
} = require("../../controllers/staff/admin");
const { requireAdmin } = require("../util/permissions");

// Get a list of all users
router.get("/userlist/", auth.required, requireAdmin, getUsers);

// Get a single user by id
router.get("/user/:id", auth.required, requireAdmin, spyUser);

// Update a single user by id
router.patch("/user/:id", auth.required, requireAdmin, manageUser);

// Delete a user by ID 
router.delete("/user/:id", auth.required, requireAdmin, deleteUser);

module.exports = router;
