const { User } = require('../models');
const httpStatus = require('../controllers/httpStatus');

const DISPLAY_NAME_LENGTH = 8;
const PASSWORD_LENGTH = 6;

const emailTester = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const validateUser = (req, res, next) => {
  const { displayName, password } = req.body;
  let message;
  if (displayName.length < DISPLAY_NAME_LENGTH) {
    message = '"displayName" length must be at least 8 characters long';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (password.length < PASSWORD_LENGTH) {
    message = '"password" length must be 6 characters long';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  let message;

  if (!email) {
    message = '"email" is required';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (!emailTester(email)) {
    message = '"email" must be a valid email';
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const message = 'User already registered';
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(httpStatus.CONFLICT).json({ message });
  }
  next();
};

module.exports = {
  validateUser,
  validateEmail,
  emailExists,
};
