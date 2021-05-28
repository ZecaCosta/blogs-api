const { User } = require('../models');
const httpStatus = require('../controllers/httpStatus');

const LENGTH = 1;

const validatePassaword = (req, res, next) => {
  const { password } = req.body;
  let message;
 
  if (!password && password !== '') {
    message = '"password" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (password.length < LENGTH) {
    message = '"password" is not allowed to be empty';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  let message;

  if (!email && email !== '') {
    message = '"email" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (email.length < LENGTH) {
    message = '"email" is not allowed to be empty';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const message = 'Invalid fields';
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = {
  validatePassaword,
  validateEmail,
  emailExists,
};
