//desc: when a request happens deal with it using a controller fxn
const express = require('express')

//controller functions
const {signupUser, loginUser} = require('../controllers/userController')

//instance of express router
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router