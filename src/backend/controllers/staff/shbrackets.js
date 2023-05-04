/**
 * This file provides database functions for Shipping & Handling brackets
 */
const SHBracket = require("../../models/SHBracket");
const mongoose = require("mongoose");

/**
 * Gets a json of all brackets
 */
const getBrackets = async (req, res) => {
  const brackets = await SHBracket.find({}).sort({ minWeight: 1 });

  res.status(200).json(brackets);
};

/**
 * Updates an existing bracket by ID
 */
const updateBracket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Bracket does not exist" });
    }

    const bracket = await SHBracket.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!bracket) {
      return res.status(404).json({ error: "Bracket does not exist" });
    }

    res.status(200).json(bracket);
  } catch (error) {
    res.status(500).json({ error: "Error updating bracket" });
  }
};

/**
 * Adds a new bracket
 */
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

  const allBrackets = await SHBracket.find({}).sort({ minWeight: 1 });
  const overlappingBracket = allBrackets.some((bracket) => {
    return minWeight <= bracket.maxWeight && maxWeight >= bracket.minWeight;
  });

  if (overlappingBracket) {
    return res.status(400).json({
      error: "The submitted bracket overlaps with an existing bracket.",
    });
  }

  try {
    const bracket = await SHBracket.create({ minWeight, maxWeight, charge });
    res.status(200).json(bracket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Deletes a bracket by ID
 */
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
