const express = require('express');

const router = express.Router(); 
// @desc validation middleware 
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require('../utils/validator/brandValidator ')

// @desc user requists functions
const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
} = require("../services/brandService")

// Routes
router
  .route('/')
  .get(getBrands)
  .post(createBrandValidator, createBrand)
router
  .route('/:id') 
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand)

module.exports = router;
