/**
 * Cart Routes
 */

const express = require("express");
const {
  addPartToCart,
  removePartFromCart,
  editPartInCart,
  getCart,
} = require("../../controllers/users/cart");
const { authRequired } = require("../util/auth");
const router = express.Router();

router.get("/", authRequired, getCart);

router.post("/", authRequired, addPartToCart);

router.patch("/", authRequired, editPartInCart);

router.delete("/:partNumber", authRequired, removePartFromCart);

module.exports = router;
