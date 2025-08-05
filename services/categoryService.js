const factory = require('./handlerFactory')
const CategoryModel = require('../models/categoryModel')

// @desc    GET list of categories
// @route   GET /api/v1/categories
// @access  Public
exports. getCategories =  factory.getAll(CategoryModel)

// @desc GET specific category by id 
// @route   GET /api/v1/categories/:id
// @access  Public
exports. getCategory = factory.getOne(CategoryModel)

// @desc   Create category
// @route  POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(CategoryModel)

// @desc   Update specific category
// @route  POST /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(CategoryModel)


// @desc   delete specific category
// @route  DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(CategoryModel)

