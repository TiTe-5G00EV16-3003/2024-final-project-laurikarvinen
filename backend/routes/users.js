const express = require('express');
const { loginUser, signUpUser } = require('../controllers/users');


const router = express.Router();

//http://localhost:5000/api/users/signup
router.post('/signup', signUpUser);

//http://localhost:5000/api/users/login
router.post('/login', loginUser);

module.exports = router;