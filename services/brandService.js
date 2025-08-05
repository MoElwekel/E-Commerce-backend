const factory = require('./handlerFactory')
const BrandModel = require('../models/brandModel')

// @desc    GET list of brands
// @route   GET /api/v1/brands
// @access  Public
exports. getBrands = factory.getAll(BrandModel)

// @desc GET specific brand by id 
// @route   GET /api/v1/brand/:id
// @access  Public
exports. getBrand = factory.getOne(BrandModel)

// @desc   Create brand
// @route  POST /api/v1/brands
// @access Private
exports.createBrand = factory.createOne(BrandModel)

// @desc   Update specific brand
// @route  POST /api/v1/brands/:id
// @access Private
exports.updateBrand = factory.updateOne(BrandModel)

// @desc   delete specific brand
// @route  DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(BrandModel)
