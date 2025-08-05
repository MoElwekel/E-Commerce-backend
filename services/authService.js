// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')


const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const ApiError = require('../utils/apiError')
const sendEmail = require('../utils/sendEmail')


// @desc    Signup a new user
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create new user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  // 2) Create token
  const token = jwt.sign( {userId: user._id} , process.env.TOKEN_SECRET, {expiresIn: '1d'} )

  // 3) Send response
  res.status(201).json({data: user, token})
})

// @desc    login to user
// @route   GET /api/v1/auth/signin
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if pass and email in the body (validation)
  // 2) check if user exit & check if password is correct
  const user = await User.findOne({email : req.body.email})
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Invalid email or password', 401))
  }
  // 3) Create token
  const token = jwt.sign( {userId: user._id} , process.env.TOKEN_SECRET, {expiresIn: '1d'} )
  // 4) Send response
  res.status(200).json({data: user, token})
})


// @desc make syre the user is logged in
exports.protect = asyncHandler(async (req,res,next) => {

  // 1) check if token exist, if exist ==> get
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ApiError('You are not logged in, please login to get access', 401));
  }

  // 2) verify token (nochange happens, expired token)
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET) 

  // 3) check if user exists
  const currentUser = await User.findById(decoded.userId)
  if (!currentUser) {
    return next(new ApiError('User that belong to that token no longer exist', 401));
  }
  // 4) check if user change his pass after token created
  if (currentUser.passwordChangedAt) {
    const passChangeTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000 , 10);
    if (passChangeTimestamp > decoded.iat ){
      return next(new ApiError("User changed password recently",401))
    }
  } 
  
  req.user = currentUser;
  next();
})


// @desc Authorization 
exports.restrictTo = (...roles) => 
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(new ApiError('You do not have permission to perform this action', 403))
    }
    next();
});



// @desc    Forgot Passwrd
// @route   GET /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req,res,next) => {
  // 1) get user email
  const user = await User.findOne({email:req.body.email})
  if (!user) {
    return next(new ApiError('No User for this Email', 404))
  }
  // 2) if user exist, generate hash random 6 digits and save it in db 
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex')

  // save hased password reset code in db
  user.passwordResetCode = hashedResetCode;
  // add exp time for reset code (10 min)
  user.passwordResetExpires = Date.now() + 10*60*1000
  user.passwordResetVerified = false;

  user.save()
  // 3) send the reset code via email (./utils/sendEmail)
  try{
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Code',
      message: `Your RestCode is ${resetCode}, (valid for 10 min)`
    })
  }catch(err){
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save()
    return next(new ApiError('There is a problem in sending email', 500))
  }

  res.status(200).json({status:"sucess", message:"Reset code sent to your email"})
})


// @desc    Verify pass reset code
// @route   GET /api/v1/auth/verifyResetcode
// @access  Public
exports.verifyPassResetCode = asyncHandler( async (req,res,next)=>{
  // 1)get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex')
  
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: {$gt:Date.now()}})

  if (!user) {
    return next(new ApiError("Reset Code Invalid", 404))
  }


  // 2) Reset code vaild
  user.passwordResetVerified = true
  await user.save()

  const resetToken = jwt.sign( {userId: user._id} , process.env.TOKEN_SECRET, {expiresIn: '1d'} )
  res.status(200).json({status: "Success", resetToken})

})



// @desc    Reset Password
// @route   GET /api/v1/auth/resetpassword
// @access  Public
exports.resetPassword = asyncHandler( async (req,res,next)=>{
  // 1) Get reset-token from header
  const resetToken = req.headers['reset-token'];
  if (!resetToken) {
    return next(new ApiError("Reset token is missing", 401));
  }

  // 2) Verify token
  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.TOKEN_SECRET);
  } catch (err) {
    return next(new ApiError("Invalid or expired reset token", 401));
  }

  // 3) Find user by email inside the token
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  // 4) Check if reset code was verified
  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code is not verified", 403));
  }


  // 3) create new password
  user.password = req.body.newPassword;

  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save()

  // 4) generate token
  const token = jwt.sign( {userId: user._id} , process.env.TOKEN_SECRET, {expiresIn: '1d'} )
  res.status(200).json({ token })
})