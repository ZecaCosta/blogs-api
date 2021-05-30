const httpStatus = require('./httpStatus');
const { BlogPost, User, Category } = require('../models');

const create = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.user;
      const insertPost = { title, content, userId: id, published: Date(), updated: Date() };
      const post = await BlogPost.create(insertPost);
      return res.status(httpStatus.CREATED).json(post);
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao salvar post no banco',
        error: error.message,
      });
    }
};
/*
https://sequelize.org/master/manual/eager-loading.html
fonte para opções de include
*/
const getAll = async (req, res) => {
  const nopostsMessage = { message: 'No posts yet' };
  try {
    const { id } = req.user;
    const posts = await BlogPost.findAll({ 
      where: { userId: id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!posts) return res.status(httpStatus.NOT_FOUND).json(nopostsMessage);
    return res.status(httpStatus.OK).json(posts);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Erro ao buscar posts no banco',
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
};