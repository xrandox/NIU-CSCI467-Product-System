/**
 * Credit Card Processing Routes
 */

 const express = require("express");
 const { submitCard } = require("../../controllers/external/credit");
 const router = express.Router();
 
 // Submit a credit card transaction
 router.post("/", submitCard);
 
 module.exports = router;