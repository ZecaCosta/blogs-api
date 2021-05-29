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

const getUsers = async (req, res) => {
  const noUsersMessage = { message: 'Users do not exist' };
  try {
      const users = await User.findAll();
      if (!users) return res.status(httpStatus.NOT_FOUND).json(noUsersMessage);
      res.status(httpStatus.OK).json(users);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar usuários no banco',
        error: error.message,
      });
  }
};

const getUser = async (req, res) => {
  try {
    const noUserMessage = { message: 'User does not exist' };
    const user = await User.findByPk(req.params.id);
      if (!user) return res.status(httpStatus.NOT_FOUND).json(noUserMessage);
      res.status(httpStatus.OK).json(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar usuário no banco',
        error: error.message,
      });
  }
};

module.exports = {
  createUser,
  createLogin,
  getUsers,
  getUser,
};