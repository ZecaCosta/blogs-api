const express = require('express');
const postsController = require('../controllers/postsControler');
const postValidation = require('../services/postValidation');
const { validateToken } = require('../services/token');

const router = express.Router();

router.post('/post',
postValidation.validatePost,
postValidation.categoryExists,
validateToken,
postsController.create);

router.get('/post',
validateToken,
postsController.getAll);

module.exports = router;