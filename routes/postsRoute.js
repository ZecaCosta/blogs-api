const express = require('express');
const postsController = require('../controllers/postsControler');
const postValidation = require('../services/postValidation');
const postUpdateValidation = require('../services/postUpdateValidation');
const postDeleteValidation = require('../services/postDeleteValidation');
const { validateToken } = require('../services/token');

const router = express.Router();

router.get('/post/search',
validateToken,
postValidation.paramExists,
postsController.searchPost);

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

router.delete('/post/:id',
postDeleteValidation.postExists,
validateToken,
postDeleteValidation.verifyUser,
postsController.deletePost);

module.exports = router;