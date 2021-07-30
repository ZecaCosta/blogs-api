const express = require('express');
const usersController = require('../controllers/usersControler');
const userValidation = require('../services/userValidation');
const loginValidation = require('../services/loginValidation');
const { validateToken } = require('../services/token');

const router = express.Router();

router.post('/user',
userValidation.validateUser,
userValidation.validateEmail,
userValidation.emailExists,
usersController.createUser);

router.get('/user',
validateToken,
usersController.getUsers);

router.get('/user/:id',
validateToken,
usersController.getUser);

router.delete('/user/me',
validateToken,
usersController.deleteUser);

router.post('/login',
loginValidation.validateEmail,
loginValidation.validatePassaword,
loginValidation.emailExists,
usersController.createLogin);

module.exports = router;