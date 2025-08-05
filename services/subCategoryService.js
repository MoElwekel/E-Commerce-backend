const factory = require('./handlerFactory')
const subCategory = require('../models/subCategoryModel')


exports.setCategoryIdToBody = (req,res,next)=>{
  // Nest route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
}

// Nested Rout
// GET GET /api/v1/categories/:categoryId/subCategories
exports.createFilterObj = (req,res,next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category : req.params.categoryId };
  }
  req.filterObject=filterObject;
  next();
}

// @desc   Create subcategory
// @route  POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(subCategory);

// @desc    GET list of Subcategories
// @route   GET /api/v1/Subcategories
// @access  Public
exports. getSubCategories = factory.getAll(subCategory)

// @desc GET specific Subcategory by id 
// @route   GET /api/v1/Subcategory/:id
// @access  Public
exports. getSubCategory = factory.getOne(subCategory)

// @desc   Update specific Subcategory
// @route  POST /api/v1/Subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(subCategory)

// @desc   delete specific Subcategory
// @route  DELETE /api/v1/Subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(subCategory)
