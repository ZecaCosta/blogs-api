const httpStatus = require('./httpStatus');
const { Category } = require('../models');

const createCategory = async (req, res) => {
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

const getUsers = async (req, res) => {
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

// const getUser = async (req, res) => {
//   try {
//     const noUserMessage = { message: 'User does not exist' };
//     const category = await Category.findByPk(req.params.id);
//       if (!category) return res.status(httpStatus.NOT_FOUND).json(noUserMessage);
//       return res.status(httpStatus.OK).json(category);
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//         message: 'Erro ao buscar usuário no banco',
//         error: error.message,
//       });
//   }
// };

module.exports = {
  createCategory,
  getUsers,
//   getUser,
};