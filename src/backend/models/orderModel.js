const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderedProduct = new Schema({
    productID: { type: mongoose.Types.ObjectId, required: true },
    quantity: { type: Number, required: true }
})

const orderSchema = new Schema({
    customerID: { type: mongoose.Types.ObjectId, required: true },
    products: { type: [orderedProduct], required: true },
    status: {
        type: Number,
        default: 0, //-1 - Cancelled, 0 - Processing, 1 - Shipped, 2 - Delivered
        min: -1,
        max: 2
    }
})

module.exports = mongoose.model('Order', orderSchema)