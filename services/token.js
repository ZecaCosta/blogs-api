require('dotenv').config();
const jwt = require('jsonwebtoken');
const httpStatus = require('../controllers/httpStatus');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'myjwtsecret';
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const createToken = (id, displayName, email) => {
  const token = jwt.sign({ data: [id, displayName, email] }, secret, jwtConfig);
  return token;
};

const noTokenMessage = { message: 'Token not found' };
const noUserMessage = { message: 'Usuario não cadastrado.' };

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json(noTokenMessage);
    try {
      const decoded = jwt.verify(token, secret);
      const email = decoded.data[2];
      const user = await User.findOne({ where: { email } });
    if (!user) return res.status(httpStatus.UNAUTHORIZED).json(noUserMessage);
    req.user = user.dataValues;
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Expired or invalid token',
      error: error.message,
    });
  }
    next();
  };

module.exports = { 
  createToken,
  validateToken,
};