/**
 * This file contains the API routes for admin API endpoints
 */

const express = require("express");
const auth = require("./auth");
const router = express.Router();
const {
  getUsers,
  spyUser,
  manageUser,
  deleteUser,
} = require("../controllers/admin");
const { requireAdmin } = require("./permissions");

// Get a list of all users
router.get("/userlist/", auth.required, requireAdmin, getUsers);

// Get a single user by id
router.get("/user/:id", auth.required, requireAdmin, spyUser);

// Update a single user by id
router.put("/user/:id", auth.required, requireAdmin, manageUser);

// Delete a user by ID 
router.delete("/user/:id", auth.required, requireAdmin, deleteUser);

module.exports = router;
