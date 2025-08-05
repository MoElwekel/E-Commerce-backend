const mongoose = require('mongoose');

//create database
//1- create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Brand required'],
      unique: [true, 'Unique Brand'],
      minlength: [3, 'Brand Name is too short'],
      maxlenght: [32, 'Brand Name is too long']
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
module.exports= mongoose.model('Brand', brandSchema)



