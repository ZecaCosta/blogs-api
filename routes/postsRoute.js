const express = require('express');
const postsController = require('../controllers/postsControler');
const postValidation = require('../services/postValidation');
const postUpdateValidation = require('../services/postUpdateValidation');
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

router.get('/post/:id',
validateToken,
postsController.getById);

router.put('/post/:id',
postUpdateValidation.validatePost,
postUpdateValidation.postExists,
validateToken,
postUpdateValidation.verifyUser,
postsController.update);

module.exports = router;