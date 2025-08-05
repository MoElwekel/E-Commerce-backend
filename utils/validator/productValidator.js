const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const subCategory = require('../../models/subCategoryModel');

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Too short product title')
    .notEmpty()
    .withMessage('Product title is required')
    .custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
    }),
  
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 20 })
    .withMessage('Too short product description'),

  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a positive number'),
  
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product sold must be a positive number'),
  
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a positive number')
    .isLength({ max: 32 })
    .withMessage('Too long product price'),
  
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product price after discount must be a positive number')
    .toFloat()
    .custom((val, { req }) => {
      if (val >= req.body.price) {
        throw new Error('Price after discount must be less than the price');
      }
      return true;
    }),

  check('color')
    .optional()
    .isArray()
    .withMessage('Colors shoud be array of string'),

  check('imageCover')
    .notEmpty()
    .withMessage('Product image cover is required'),

  check('images')
    .optional()
    .isArray()
    .withMessage('Images should be an array of strings'),

  check('category')
    .notEmpty()
    .withMessage('Product category is required')
    .isMongoId()
    .withMessage('Invalid ID Format')
    .custom(async (val)=>{
      const category = await Category.findById(val);
      if (!category) {
        throw new Error(`No category found for ID: ${val}`);
      }
      return true;
    }), 

  check('subCategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID Format')
    .custom(async (val) => {
      const result = await subCategory.find({ _id: { $exists: true, $in: val } });
      if (result.length === 0 || result.length !== val.length) {
        throw new Error(`No subcategory found for ID: ${val}`);
      }
      return true;
    })
    .custom(async (val, { req }) => {
      const subCategories = await subCategory.find({ category: req.body.category });
      const subCatIdsInDB = subCategories.map((subCat) => subCat._id.toString());
      if (!val.every((id) => subCatIdsInDB.includes(id))) {
        throw new Error(`Subcategory must belong to the parent category`);
      }
      return true;
    }),

  check('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID Format'),
  
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('Product ratings average must be a number')
    .isLength({ min: 1, max: 5 })
    .withMessage('Product ratings average must be between 1 and 5'),

  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('Product ratings quantity must be a number'),

  validatorMiddleware
]

exports.getProductValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Product ID Format'),
  
  validatorMiddleware
]

exports.updateProductValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Product ID Format'),
    body('title').optional().custom( (val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]


exports.deleteProductValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Product ID Format'),

  validatorMiddleware
]

