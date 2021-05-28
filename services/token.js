require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'myjwtsecret';
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const createToken = (id, displayName, email) => {
  const token = jwt.sign({ data: [id, displayName, email] }, secret, jwtConfig);
  return token;
};

module.exports = { 
  createToken,
};