const express = require('express')

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj
} = require("../services/subCategoryService")

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require('../utils/validator/subCategoryValidator')


//mergeParams allow us to access params in other routes
const router = express.Router({ mergeParams : true}); 

router
  .route('/')
  .post( setCategoryIdToBody ,createSubCategoryValidator, createSubCategory)
  .get( createFilterObj,getSubCategories)
  
router
  .route('/:id')
  .get( getSubCategoryValidator, getSubCategory)
  .put( updateSubCategoryValidator, updateSubCategory)
  .delete( deleteSubCategoryValidator, deleteSubCategory)
  



module.exports = router;


