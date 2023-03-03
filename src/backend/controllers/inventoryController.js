const Product = require('../models/productModel')
const mongoose = require('mongoose')

// all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({id: -1})

    res.status(200).json(products)
}

// single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

// add product
const addProduct = async (req, res) => {
    const { name, quantity } = req.body

    let emptyFields = []

    if (!name) { emptyFields.push('name') }
    if (!quantity) { emptyFields.push('quantity') }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields: emptyFields})
    }

    try {
        const product = await Product.create({name, quantity})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

// update product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}