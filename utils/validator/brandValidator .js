const { check , body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require ('../../middlewares/validatorMiddleware')

exports.getBrandValidator=[
  // 1- rules
  check('id').isMongoId().withMessage('Invalid Id'),
  // 2-middleware
  validatorMiddleware
]

exports.createBrandValidator = [
  check('name').notEmpty().withMessage('Brand required')
  .isLength({min:3}).withMessage('Name is too short')
  .isLength({max:32}).withMessage('Name is too long')
  .custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]


exports.updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand Id'),
  body('name').custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]


exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand Id'),
  validatorMiddleware
]
