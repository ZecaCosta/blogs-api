const httpStatus = require('./httpStatus');
const { Category } = require('../models');

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        return res.status(httpStatus.CREATED).json(category);
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao salvar categoria no banco',
          error: error.message,
        });
    }
};

const getAll = async (req, res) => {
  const noCategoriesMessage = { message: 'Categories do not exist' };
  try {
      const categories = await Category.findAll();
      if (!categories) return res.status(httpStatus.NOT_FOUND).json(noCategoriesMessage);
      return res.status(httpStatus.OK).json(categories);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar categorias no banco',
        error: error.message,
      });
  }
};

module.exports = {
  create,
  getAll,
};