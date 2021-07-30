const { Category, User, BlogPost } = require('../models');
const httpStatus = require('../controllers/httpStatus');

const validatePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  let message;

  if (!title) {
    message = '"title" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (!content) {
    message = '"content" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }

  if (!categoryIds) {
    message = '"categoryIds" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const categoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const message = '"categoryIds" not found';
  const categories = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  const nonexistentCategory = categories.find((item) => item === null);
  if (nonexistentCategory === null) {
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const paramExists = async (req, res, next) => {
  if (!req.query.q) {
    const allPosts = await BlogPost.findAll({ 
      where: { userId: req.user.id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    }); 
      return res.status(httpStatus.OK).json(allPosts);
  }
  next();
};

module.exports = {
  validatePost,
  categoryExists,
  paramExists,
};