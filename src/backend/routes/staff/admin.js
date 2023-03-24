/**
 * Admin Routes
 */

const express = require("express");
const { authRequired } = require("../util/auth");
const router = express.Router();
const {
  getUsers,
  spyUser,
  manageUser,
  deleteUser,
} = require("../../controllers/staff/admin");
const { requireAdmin } = require("../util/permissions");

// Get a list of all users
router.get("/userlist/", authRequired, requireAdmin, getUsers);

// Get a single user by id
router.get("/user/:id", authRequired, requireAdmin, spyUser);

// Update a single user by id
router.patch("/user/:id", authRequired, requireAdmin, manageUser);

// Delete a user by ID
router.delete("/user/:id", authRequired, requireAdmin, deleteUser);

module.exports = router;
