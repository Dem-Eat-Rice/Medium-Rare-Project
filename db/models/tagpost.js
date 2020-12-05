"use strict";
module.exports = (sequelize, DataTypes) => {
  const TagPost = sequelize.define(
    "TagPost",
    {
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Tags" },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Posts" },
      },
    },
    {}
  );
  TagPost.associate = function (models) {
    // associations can be defined here
  };
  return TagPost;
};
