const definePostCategoryModel = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory', {}, { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};

module.exports = definePostCategoryModel;

    // {
    //   categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    //   postId: { type: DataTypes.INTEGER, primareyKey: true },
    // }, { timestamps: false });

    // models.Category.belongsToMany(models.BlogPost, { 
    //   as: 'blogPosts',