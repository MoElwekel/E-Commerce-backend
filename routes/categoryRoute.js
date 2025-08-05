const express = require('express');

const router = express.Router(); 
const authService = require('../services/authService')

// @desc validation middleware 
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require('../utils/validator/categoryValidator')

// @desc user requists functions
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory 
} = require("../services/categoryService")


const SubCategoriesRoute = require('./subCategoryRoute')

router.use('/:categoryId/subcategories', SubCategoriesRoute)


// Routes
router
  .route('/')
  .get(getCategories )
  .post(
    authService.protect,
     authService.restrictTo("admin"),
    createCategoryValidator,
    createCategory)
router
  .route('/:id')
  .get(getCategoryValidator,getCategory)
  .put(updateCategoryValidator,updateCategory)
  .delete(deleteCategoryValidator,deleteCategory)

module.exports = router;
