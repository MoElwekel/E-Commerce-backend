const { check,body } = require('express-validator');
const slugify = require('slugify')
const validatorMiddleware = require ('../../middlewares/validatorMiddleware')


exports.getSubCategoryValidator=[
  // 1- rules
  check('id').isMongoId().withMessage('Invalid SubCategory Id'),
  // 2-middleware
  validatorMiddleware
]

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty().withMessage('SubCategory required')
    .bail()
    .isLength({min:2,max:32}).withMessage('Name must be between 2 and 32')
    .bail()
    .custom( (val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    // .isLength({max:32}).withMessage('Name is too long'),
  check('category')
    .notEmpty().withMessage('SubCategory must belong to Category')
    .bail()
    .isMongoId().withMessage('Invalid Category Id'),
  
  
  validatorMiddleware
]


exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id'),
  body('name').custom( (val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware
]


exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id'),
  validatorMiddleware
]
