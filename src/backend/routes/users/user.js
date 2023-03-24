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
const { authRequired } = require("../util/auth");
const router = express.Router();

// Update self
router.patch("/", authRequired, updateUser);

// Grab Current User
router.get("/", authRequired, getUser);

// Registration
router.post("/", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;
