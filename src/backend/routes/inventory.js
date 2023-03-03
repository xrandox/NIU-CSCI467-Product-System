const express = require('express')
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/inventoryController')
const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', addProduct)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

module.exports = router