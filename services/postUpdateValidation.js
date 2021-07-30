const { BlogPost } = require('../models');
const httpStatus = require('../controllers/httpStatus');

const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  let message;

  if (!title) {
    message = '"title" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (!content) {
    message = '"content" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }

  if (req.body.categoryIds) {
    message = 'Categories cannot be edited';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const postExists = async (req, res, next) => {
  const post = await BlogPost.findByPk(req.params.id);
  const message = 'Post not found';

  if (!post) {
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const verifyUser = async (req, res, next) => {
  const { id } = req.user;
  const post = await BlogPost.findByPk(req.params.id);
  const { userId } = post;
  const message = 'Unauthorized user';

  if (userId !== id) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message });
  }
  next();
};

module.exports = {
  validatePost,
  postExists,
  verifyUser,
};