const mongoose = require('mongoose');

//create database
//1- create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Category required'],
      unique: [true, 'Unique category'],
      minlength: [3, 'Name is too short'],
      maxlenght: [32, 'Name is too long']
    },
    // A and B ==> url= a-and-b
    slug:{
      type: String,
      lowercase: true
    },
    image: String
  },
  //created at: & updated at:
  {timestamps: true}
);

//2- create model
const CategoryModel = mongoose.model('Category', categorySchema)



module.exports = CategoryModel;