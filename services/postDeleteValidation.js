const { BlogPost } = require('../models');
const httpStatus = require('../controllers/httpStatus');

const postExists = async (req, res, next) => {
  const post = await BlogPost.findByPk(req.params.id);
  const message = 'Post does not exist';

  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message });
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
  postExists,
  verifyUser,
};