const { Category } = require('../models');
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

module.exports = {
  validatePost,
  categoryExists,
};