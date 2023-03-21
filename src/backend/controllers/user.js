/**
 * This file provides database functions for products that are then referenced by /routes/user.js
 */

const User = require('../models/User');
const mongoose = require("mongoose");

const getUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({ error: "Could not find user" })
    }
}