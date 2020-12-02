'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TagPosts",
      [
        {
          tagId: 1,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tagId: 2,
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TagPosts", null, {});
  },
};