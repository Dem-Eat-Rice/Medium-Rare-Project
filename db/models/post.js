'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "authorId" });
    Post.hasMany(models.Like, { foreignKey: "postId" });
    Post.belongsToMany(models.Tag, {foreignKey: "postId", through: models.TagPost, otherKey: 'tagId'});
    Post.hasMany(models.Comment, { foreignKey: "postId"});
  };
  return Post;
};