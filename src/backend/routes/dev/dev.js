/**
 * Dev Routes
 */
const express = require("express");
const { authRequired } = require("../util/auth");
const { requireAdmin } = require("../util/permissions");
const {
  populateInventory,
  viewInventory,
  emailCheck,
} = require("../../controllers/dev/dev");
const router = express.Router();

router.post(
  "/populateinventory",
  authRequired,
  requireAdmin,
  populateInventory
);

router.get("/:id", authRequired, requireAdmin, viewInventory);

router.post("/email", authRequired, requireAdmin, emailCheck);

module.exports = router;
