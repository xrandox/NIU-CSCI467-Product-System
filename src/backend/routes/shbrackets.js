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

router.get("/", auth.required, requireAdmin, getBrackets);

router.patch("/:id", auth.required, requireAdmin, updateBracket);

router.delete("/:id", auth.required, requireAdmin, deleteBracket);

router.post("/", auth.required, requireAdmin, addBracket);

module.exports = router;
