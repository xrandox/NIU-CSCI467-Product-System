/**
 * This file provides database functions for admins
 */

 const User = require("../models/User");
 const mongoose = require("mongoose");
 const {
    getUser,
    updateUser,
  } = require("../controllers/users");

/**
 * Returns a json of all users, sorted by document ID
 */
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ _id: -1 });

    res.status(200).json(users);
}

/**
 * Attemps to delete a user by ID
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User does not exist" });
      }
    
      const user = await User.findById(id);
    
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }
    
      res.status(200).json(user);
}

/**
 * Spies on a users profile by ID
 */
const spyUser = async (req, res) => {
  //TODO: this!
};

/**
 * Edits a users profile by ID
 */
const manageUser = async (req, res) => {
  //TODO: this!
};

  module.exports = {
    getUsers,
    spyUser,
    manageUser,
    deleteUser
  }
