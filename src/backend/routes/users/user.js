/**
 * User Routes
 */

const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
} = require("../../controllers/users/user");
const auth = require("../util/auth");
const router = express.Router();

// Update self
router.patch("/", auth.required, updateUser);

// Grab Current User
router.get("/", auth.required, getUser);

// Registration
router.post("/", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;
