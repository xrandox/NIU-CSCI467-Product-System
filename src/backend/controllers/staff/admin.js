/**
 * This file provides database functions for admins
 */

const User = require("../../models/User");
const mongoose = require("mongoose");

/**
 * Returns a json of all users, sorted by document ID
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: 1 });
    const prettyUsers = users.map((user) => user.toAdminJSON());

    return res.status(200).json(prettyUsers);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Attemps to delete a user by ID
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json(user.toAdminJSON());
};

/**
 * Returns all information of a user by id
 */
const spyUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json(user.toAdminJSON());
};

/**
 * Edits a users profile by ID
 */
const manageUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, name, password, role, address, orders } =
    req.body.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  // unfortunately cant just spread the req body because of password :(
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (name) {
    user.name = name;
  }
  if (password) {
    user.setPassword(password);
  }
  if (role) {
    user.role = role;
  }
  if (address) {
    user.address = address;
  }
  if (orders) {
    user.orders = orders;
  }

  return user.save().then(function () {
    return res.json(user.toAdminJSON());
  });
};

module.exports = {
  getUsers,
  spyUser,
  manageUser,
  deleteUser,
};
