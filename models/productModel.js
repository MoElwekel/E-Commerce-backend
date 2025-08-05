const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'To long product title'],
    minlength: [3, 'Too short product title'],
  },
  slug:{
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    minlength: [20, 'Too short product description']
  },
  quantity: {
    type: Number,
    required: true
  },
  sold:{
    type: Number,
    default: 0
  },
  price:{
    type: Number,
    required: true,
    max: [1000000, 'Too long product price']
  },
  priceAfterDiscount: {
    type: Number,
    default: 0
  },
  color: [String],
  imageCover:{
    type: String,
    required: [true, 'Product cover image is required'],
  },
  images: [String],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Product must be belong to a category']
  },
  subCategory: [{
    type: mongoose.Schema.ObjectId,
    ref: 'SubCategory',
  }],
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand',
  },
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
},{ timestamps: true });

// mongoose query middleware
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'category',
    select: '-_id name'
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);

