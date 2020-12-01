"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("TagPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Tags" },
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Posts" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TagPosts");
  },
};
