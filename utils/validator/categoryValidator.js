const { check, body } = require('express-validator');
const slugify = require('slugify')
const validatorMiddleware = require ('../../middlewares/validatorMiddleware')


exports.getCategoryValidator=[
  // 1- rules
  check('id').isMongoId().withMessage('Invalid Id'),
  // 2-middleware
  validatorMiddleware
]

exports.createCategoryValidator = [
  check('name').notEmpty().withMessage('Category required')
  .isLength({min:3}).withMessage('Name is too short')
  .isLength({max:32}).withMessage('Name is too long')
  .custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]


exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Id'),
  body('name').custom( (val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware
]


exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Id'),
  validatorMiddleware
]
