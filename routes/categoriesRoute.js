const express = require('express');
const categoriesController = require('../controllers/categoriesControler');
const categoryValidation = require('../services/categoryValidation');
const { validateToken } = require('../services/token');

const router = express.Router();

router.post('/categories',
categoryValidation.validateCategory,
validateToken,
categoriesController.createCategory);

router.get('/categories',
validateToken,
categoriesController.getUsers);

// router.get('/categories/:id',
// validateToken,
// categoriesController.getUser);

module.exports = router;