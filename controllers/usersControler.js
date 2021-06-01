const httpStatus = require('./httpStatus');
const { User } = require('../models');
const { createToken } = require('../services/token');

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const user = await User.create({ displayName, email, password, image });
        const { id } = user.dataValues;
        const token = createToken(id, displayName, email);
        return res.status(httpStatus.CREATED).json({ token });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
      return res.status(httpStatus.OK).json({ token });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao tentar fazer login',
          error: error.message,
        });
    }
};

const getUsers = async (req, res) => {
  const message = 'Users do not exist';
  try {
      const users = await User.findAll();
      if (!users) return res.status(httpStatus.NOT_FOUND).json({ message });
      return res.status(httpStatus.OK).json(users);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar usuários no banco',
        error: error.message,
      });
  }
};

const getUser = async (req, res) => {
  try {
    const message = 'User does not exist';
    const user = await User.findByPk(req.params.id);
      if (!user) return res.status(httpStatus.NOT_FOUND).json({ message });
      return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar usuário no banco',
        error: error.message,
      });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    await User.destroy({
      where: { id },
    });
      return res.status(httpStatus.NOT_CONTENT).send();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar usuário no banco',
        error: error.message,
      });
  }
};

module.exports = {
  createUser,
  createLogin,
  getUsers,
  getUser,
  deleteUser,
};