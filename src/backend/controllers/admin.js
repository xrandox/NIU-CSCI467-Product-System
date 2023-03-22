/**
 * This file provides database functions for admins
 */

 const User = require("../models/User");
 const mongoose = require("mongoose");
 const {
    getUser,
    updateUser,
  } = require("../controllers/users");

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ _id: -1 });

    res.status(200).json(users);
}

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

const spyUser = getUser;

const manageUser = updateUser;

  module.exports = {
    getUsers,
    spyUser,
    manageUser,
    deleteUser
  }
