'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Post, { foreignKey: "postId" });
  };
  return Like;
};