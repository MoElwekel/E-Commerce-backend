const mongoose = require('mongoose');

//create database
//1- create schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Unique subCategory'],
      minlength: [2, 'Name is too short'],
      maxlenght: [32, 'Name is too long']
    },
    // A and B ==> url= a-and-b
    slug:{
      type: String,
      lowercase: true
    },
    category:{
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true , 'subCategory must belong to parent category']

    }
  },
  //created at: & updated at:
  {timestamps: true}
);

//2- create model
module.exports = mongoose.model('SubCategory', subCategorySchema)
