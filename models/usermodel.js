const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  passwordChangedAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
  phone: String,
  profileImg: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true
  },
},{timestamps: true});

userSchema.pre('save',async function (next) {
  if (!this.isModified('password')) return next();
  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;