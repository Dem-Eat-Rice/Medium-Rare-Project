'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(30)
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};