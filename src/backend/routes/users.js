/**
 * This file contains the API routes for querying the User API
 */

const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/users");
const auth = require("./auth");
const router = express.Router();

// Update User
router.put("/user", auth.required, updateUser);

// Grab User
router.get("/user", auth.required, getUser);

// Registration
router.post("/users", registerUser);

// Login
router.post("/users/login", loginUser);

module.exports = router;
