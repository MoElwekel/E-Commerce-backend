const asyncHandler = require('express-async-handler')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const factory = require('./handlerFactory')
const ApiError = require('../utils/apiError')
const User = require('../models/usermodel')

// @desc    GET list of users
// @route   GET /api/v1/users
// @access  Private
exports. getUsers = factory.getAll(User)

// @desc GET specific user by id 
// @route   GET /api/v1/user/:id
// @access  Private
exports. getUser = factory.getOne(User)

// @desc   Create user
// @route  POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User)

// @desc   Update specific user
// @route  POST /api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler (async(req,res,next)=>{

  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    },
    {new: true}
  )
  
  if(!document){
    next(new ApiError(`no brand found for ${req.params.id}`,404))
  }else{
    res.status(200).json({ data:document })
  }
})

exports.changeUserPassword = asyncHandler (async(req,res,next)=>{

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {new: true}
  )
  
  if(!user){
    next(new ApiError(`no brand found for ${req.params.id}`,404))
  }else{
    res.status(200).json({ data:user })
  }
})


// @desc   delete specific user
// @route  DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User)


// @desc    GET logged in user details
// @route   GET /api/v1/user/:id
// @access  private/protected
exports.getLoggedInUserData = asyncHandler(async(req,res,next)=>{
  req.params.id = req.user._id
  next();
})


// @desc    Update logged user passwoed
// @route   GET /api/v1/user/updatemypassword
// @access  private/protected
exports.updateLoggedUserPassword = asyncHandler(async(req,res,next)=>{
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {new: true}
  )


  // 2) generate token
  const token = jwt.sign( {userId: user._id} , process.env.TOKEN_SECRET, {expiresIn: '1d'} )

  res.status(200).json({data: user, token})


})

// @desc    Update logged user data 
// @route   GET /api/v1/user/updateme 
// @access  private/protected
exports.updateLoggedUserData = asyncHandler(async(req,res,next)=>{
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {new: true}
  )

  res.status(200).json({ data: updatedUser })

})

// @desc    Deactivate logged user data 
// @route   GET /api/v1/user/deleteme 
// @access  private/protected
exports.deleteLoggedUserData = asyncHandler( async(req,res,next)=>{
  await User.findByIdAndUpdate(req.user._id, {active: false}, {new: true})
  res.status(204).json({ status: "User deactivated" })
})



