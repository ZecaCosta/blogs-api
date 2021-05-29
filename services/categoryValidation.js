const httpStatus = require('../controllers/httpStatus');

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  let message;
  if (!name) {
    message = '"name" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = {
  validateCategory,
};
