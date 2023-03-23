/**
 * This file contains the API routes for submitting a credit card
 */

 const express = require("express");
 const { submitCard } = require("../controllers/credit");
 const auth = require("./auth");
 const router = express.Router();
 
 // Submit a credit card transaction
 router.post("/", submitCard);
 
 module.exports = router;