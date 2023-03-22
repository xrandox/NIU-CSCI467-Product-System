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

router.get("/userlist", auth.required, requireAdmin, getUsers);

router.get("/user/:id", auth.required, requireAdmin, spyUser);

router.put("/user/:id", auth.required, requireAdmin, manageUser);

router.delete("/user/:id", auth.required, requireAdmin, deleteUser);

module.exports = router;
