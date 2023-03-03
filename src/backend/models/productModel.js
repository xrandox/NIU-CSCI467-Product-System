/**
 * This file contains the database model for a product
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * This schema represents a single product
 */
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = mongoose.model('Product', productSchema)