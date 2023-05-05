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
  const { partNumber, quantityTotal } = req.body;

  let emptyFields = [];

  if (!partNumber) {
    emptyFields.push("partNumber");
  }
  if (!quantityTotal) {
    emptyFields.push("quantityTotal");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields: emptyFields });
  }

  try {
    const partInventory = await PartInventory.create({
      partNumber,
      quantityTotal,
    });

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
    { ...req.body },
    { new: true }
  );

  if (!partInventory) {
    return res.status(404).json({ error: "No such product" });
  }
  const savedInv = await partInventory.save();
  return res.status(200).json(savedInv);
};

const removeInventory = async (partNumber, quantity) => {
  const inventory = await PartInventory.findOne({ partNumber: partNumber });

  if (!inventory) return false;

  //if we have that much available, remove it and return true
  if (inventory.quantityAvailable >= quantity) {
    inventory.quantityReserved += quantity;
    const newInv = await inventory.save();
    if (newInv) return true;
  }

  return false;
};

const addInventory = async (partNumber, quantity) => {
  const inventory = await PartInventory.findOne({ partNumber: partNumber });

  if (!inventory) return false;

  inventory.quantityReserved -= quantity;
  const newInv = await inventory.save();
  if (newInv) {
    return true;
  }

  return false;
};

module.exports = {
  addPartInventory,
  updatePartInventory,
  removeInventory,
  addInventory,
};
