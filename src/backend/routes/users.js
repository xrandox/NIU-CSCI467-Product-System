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

// Update self
router.put("/", auth.required, updateUser);

// Grab Current User
router.get("/", auth.required, getUser);

// Registration
router.post("/", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;
