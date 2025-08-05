const { check  } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require ('../../middlewares/validatorMiddleware')
const User = require('../../models/usermodel');



exports.signupValidator = [
  check('name').notEmpty().withMessage('User required')
  .isLength({min:3}).withMessage('Name is too short')
  .custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check('email')
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid email format')
 .custom(async (val) => {
    const user = await User.findOne({ email: val });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
  check('password')
  .notEmpty().withMessage('Password is required')
  .isLength({min:6}).withMessage('Password must be at least 6 characters long')
  .custom((val, { req }) => {
    if (val !== req.body.passwordConfirm) {
      throw new Error('PasswordConfirmation do not match');
    }
    return true;
  }),

  check('passwordConfirm')
  .notEmpty().withMessage('Password confirmation is required'),

  validatorMiddleware
]

exports.loginValidator = [
  
  check('email')
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid email format'),

  check('password')
  .notEmpty().withMessage('Password is required')
  .isLength({min:6}).withMessage('Password must be at least 6 characters long'),

  validatorMiddleware
]
