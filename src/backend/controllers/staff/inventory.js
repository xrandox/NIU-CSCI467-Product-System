/**
 * This file provides database functions for inventory
 */

const PartInventory = require("../../models/PartInventory");
const mongoose = require("mongoose");

/**
 * Adds a part's inventory to the database collection
 * Returns a json of the added part if successful, or a json with an error message if not
 */
const addPartInventory = async (req, res) => {
  const { partNumber, quantity } = req.body;

  let emptyFields = [];

  if (!partNumber) {
    emptyFields.push("partNumber");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields: emptyFields });
  }

  try {
    const partInventory = await PartInventory.create({ partNumber, quantity });
    res.status(200).json(partInventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Attempts to update a product in the database collection with the new parameters, by the given part number
 */
const updatePartInventory = async (req, res) => {
  const { partNumber } = req.params;

  const partInventory = await PartInventory.findOneAndUpdate(
    { partNumber: partNumber },
    { quantity: req.body.quantity },
    { new: true }
  ).exec();

  if (!partInventory) {
    return res.status(404).json({ error: "No such product" });
  }

  return res.status(200).json(partInventory);
};

module.exports = {
  addPartInventory,
  updatePartInventory,
};
