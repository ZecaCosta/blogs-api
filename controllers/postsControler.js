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
  try {
    const message = 'Posts do not exist';
    const { id } = req.user;
    const posts = await BlogPost.findAll({ 
      where: { userId: id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
      if (!posts) return res.status(httpStatus.NOT_FOUND).json({ message });
    return res.status(httpStatus.OK).json(posts);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Erro ao buscar posts no banco',
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const message = 'Post does not exist';
    const post = await BlogPost.findByPk(
      req.params.id,
      { include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] },
    );
      if (!post) return res.status(httpStatus.NOT_FOUND).json({ message });
      return res.status(httpStatus.OK).json(post);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar post no banco',
        error: error.message,
      });
  }
};

const update = async (req, res) => {
  try {
  const { title, content } = req.body;
  await BlogPost.update(  
    { title, content, updated: Date() },
    { where: { id: req.params.id } },
  );    
  const updatedPost = await BlogPost.findOne({
    where: { id: req.params.id },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
    const { id, userId, categories } = updatedPost.dataValues;
    const newPost = { id, title, content, userId, categories };
    return res.status(httpStatus.OK).json(newPost);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Erro ao atualizar post no banco', error: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};