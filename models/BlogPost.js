const defineBlogPostModel = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return blogPost;
};

module.exports = defineBlogPostModel;