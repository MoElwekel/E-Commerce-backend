const express = require('express');

const router = express.Router(); 


// @desc validation middleware 
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator
} = require('../utils/validator/productValidator')

// @desc user requists functions
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../services/productService")

// Routes
router
  .route('/')
  .get(getProducts)
  .post(createProductValidator, createProduct)
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct)

module.exports = router;
