const express = require('express');

const router = express.Router(); 


// @desc validation middleware 
const {
  signupValidator,
  loginValidator
} = require('../utils/validator/authValidator ')

// @desc user requists functions
const {
signup,
login,
forgotPassword,
verifyPassResetCode,
resetPassword
} = require("../services/authService")

// Routes

router.route('/signup').post(signupValidator,signup)
router.route('/login').post(loginValidator,login)
router.route('/forgotpassword').post(forgotPassword)
router.route('/verifyresetcode').post(verifyPassResetCode)
router.route('/resetpassword').put(resetPassword)


module.exports = router;
