/**
 * This file provides database functions for inventory
 */

const PartInventory = require("../../models/PartInventory");
const mongoose = require("mongoose");

/**
 * Returns a json of all parts, sorted by ascending part number
 */
const getAllInventory = async (req, res) => {
  const inventory = await PartInventory.find({}).sort({ partNumber: 1 });

  res.status(200).json(inventory);
};

/**
 * Attempts to return a json of the specified parts inventory
 */
const getInventory = async (req, res) => {
  try {
    const { partNumber } = req.params;

    const partInventory = await PartInventory.find({ partNumber: partNumber });
    console.log(partInventory)
    if (!partInventory || partInventory.length === 0) {
      return res.status(404).json({ error: "No such product" });
    }
  
    return res.status(200).json(partInventory);
  } catch (err) {
    return res.status(500).json({ error: err});
  }

};

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
 * Attempts to delete a product from the database collection with the given id
 * I don't think we need this? Parts should probably never be deleted from inventory, just zeroed out
const deletePartInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such part in inventory" });
  }

  const partInventory = await PartInventory.findOneAndDelete({ _id: id });

  if (!partInventory) {
    return res.status(404).json({ error: "No such part in inventory" });
  }

  res.status(200).json(partInventory);
};
*/

/**
 * Attempts to update a product in the database collection with the new parameters, by the given part number
 */
const updatePartInventory = async (req, res) => {
  const { partNumber } = req.params;

  const partInventory = await PartInventory.findOneAndUpdate(
    { partNumber: partNumber },
    { quantity: req.body.quantity }
  ).exec();

  if (!partInventory) {
    return res.status(404).json({ error: "No such product" });
  }

  return res.status(200).json(partInventory);
};

module.exports = {
  getAllInventory,
  getInventory,
  addPartInventory,
  //deletePartInventory,
  updatePartInventory,
};
