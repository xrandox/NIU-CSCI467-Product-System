/**
 * This file provides database functions for products that are then referenced by /routes/inventory.js
 */

const Product = require("../models/Product");
const mongoose = require("mongoose");

/**
 * Returns a json of all products, sorted by ascending id
 */
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 });

  res.status(200).json(products);
};

/**
 * Attempts to return a json of the specified product
 */
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

/**
 * Adds a product to the database collection
 * Returns a json of the added product if successful, or a json with an error message if not
 */
const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
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
    const product = await Product.create({ name, quantity });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Attempts to delete a product from the database collection with the given id
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

/**
 * Attempts to update a product in the database collection with the new parameters, by the given id
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
