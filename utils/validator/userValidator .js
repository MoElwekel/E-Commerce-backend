const { check , body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require ('../../middlewares/validatorMiddleware')
const User = require('../../models/usermodel');
// eslint-disable-next-line import/order
const bcrypt = require('bcryptjs');




exports.getUserValidator=[
  // 1- rules
  check('id').isMongoId().withMessage('Invalid Id'),
  // 2-middleware
  validatorMiddleware
]

exports.createUserValidator = [
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

  check('passwordConfirm').notEmpty().withMessage('Password confirmation is required'),

  check('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'),

  check('phone').isMobilePhone("ar-EG").withMessage('Invalid phone number'),
  validatorMiddleware
]

exports.changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User Id'),
  check('currentPassword').notEmpty().withMessage('Current password is required'),
  check('passwordConfirm').notEmpty().withMessage('Password confirmation is required'),
  check('password').notEmpty().withMessage('Password is required')
  .custom(async(val, { req }) => {
    // verify current password
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch){
      throw new Error('Current password is incorrect');
    }

    // verify password confirmation
    if (val !== req.body.passwordConfirm) {
      throw new Error('PasswordConfirmation do not match');
    }
    return true;
  }),
  validatorMiddleware
]

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User Id'),
  body('name').custom( (val, { req }) => {
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
  check('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'),

  check('phone').isMobilePhone("ar-EG").withMessage('Invalid phone number'),
  validatorMiddleware
]


exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User Id'),
  validatorMiddleware
]


exports.updateLoggedUserValidator = [
  body('name').custom( (val, { req }) => {
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

  check('phone').isMobilePhone("ar-EG").withMessage('Invalid phone number'),
  validatorMiddleware
]

 