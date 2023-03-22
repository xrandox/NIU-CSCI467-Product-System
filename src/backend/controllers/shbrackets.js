/**
 * This file provides database functions for Shipping & Handling brackets that are then referenced by /routes/shbrackets.js
 */

const SHBracket = require("../models/SHBracket");
const mongoose = require("mongoose");

const getBrackets = async (req, res) => {
  const brackets = await SHBracket.find({}).sort({ minWeight: -1 });

  res.status(200).json(brackets);
};

const updateBracket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bracket does not exist" });
  }

  const bracket = await SHBracket.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!bracket) {
    return res.status(404).json({ error: "Bracket does not exist" });
  }

  res.status(200).json(bracket);
};

const addBracket = async (req, res) => {
  const { minWeight, maxWeight, charge } = req.body;

  let emptyFields = [];

  if (!minWeight) {
    emptyFields.push("minWeight");
  }
  if (!maxWeight) {
    emptyFields.push("maxWeight");
  }
  if (!charge) {
    emptyFields.push("charge");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields: emptyFields });
  }

  try {
    const bracket = await SHBracket.create({ minWeight, maxWeight, charge });
    res.status(200).json(bracket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBracket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bracket does not exist" });
  }

  const bracket = await SHBracket.findOneAndDelete({ _id: id });

  if (!bracket) {
    return res.status(404).json({ error: "Bracket does not exist" });
  }

  res.status(200).json(bracket);
};

module.exports = {
  getBrackets,
  updateBracket,
  addBracket,
  deleteBracket,
};