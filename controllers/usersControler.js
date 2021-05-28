const httpStatus = require('./httpStatus');
const { User } = require('../models');
const { createToken } = require('../services/token');

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const user = await User.create({ displayName, email, password, image });
        const { id } = user.dataValues;
        const token = createToken(id, displayName, email);
        res.status(httpStatus.CREATED).json({ token });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao salvar o usuário no banco',
          error: error.message,
        });
    }
};

const createLogin = async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      const { id, displayName } = user.dataValues;
      const token = createToken(id, displayName, email);
      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao tentar fazer login',
          error: error.message,
        });
    }
};

module.exports = {
  createUser,
  createLogin,
};