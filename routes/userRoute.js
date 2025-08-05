const express = require('express');

const router = express.Router(); 


const authService = require('../services/authService')

// @desc validation middleware 
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator
} = require('../utils/validator/userValidator ')

// @desc user requists functions
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedInUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData
} = require("../services/userService")

// Routes
router.get('/getme', authService.protect, getLoggedInUserData, getUser)
router.put('/changemypassword', authService.protect, updateLoggedUserPassword)
router.put('/updateme', authService.protect, updateLoggedUserValidator, updateLoggedUserData)
router.delete('/deleteme', authService.protect, deleteLoggedUserData)

router.put("/changePassword/:id",
  authService.protect,
  authService.restrictTo('admin'),
  changeUserPasswordValidator, 
  changeUserPassword);

router
  .route('/')
  .get(
    authService.protect,
    authService.restrictTo('admin'),
    getUsers)
  .post(
    authService.protect,
    authService.restrictTo('admin'),
    createUserValidator,
    createUser)
router
  .route('/:id') 
  .get(
    authService.protect,
    authService.restrictTo('admin'),
    getUserValidator,
    getUser)
  .put(
    authService.protect,
    authService.restrictTo('admin'),
    updateUserValidator, 
    updateUser)
  .delete(
    authService.protect,
    authService.restrictTo('admin'),
    deleteUserValidator,
    deleteUser)

module.exports = router;
