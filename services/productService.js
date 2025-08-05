const factory = require('./handlerFactory')
const Product = require('../models/productModel')


// @desc    GET list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, 'Product')

// @desc GET specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product)
 
// @desc   Create product
// @route  POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product)


// @desc   Update specific product
// @route  POST /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product)



// @desc   delete specific product
// @route  DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product)
