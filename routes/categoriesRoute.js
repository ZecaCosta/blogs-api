const express = require('express');
const categoriesController = require('../controllers/categoriesControler');
const categoryValidation = require('../services/categoryValidation');
const { validateToken } = require('../services/token');

const router = express.Router();

router.post('/categories',
categoryValidation.validateCategory,
validateToken,
categoriesController.create);

router.get('/categories',
validateToken,
categoriesController.getAll);

module.exports = router;