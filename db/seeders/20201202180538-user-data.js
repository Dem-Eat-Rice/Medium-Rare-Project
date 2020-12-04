"use strict";
const bcyrpt = require('bcryptjs');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password1 = await bcyrpt.hash('Steak4Ever!', 10);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "steakboiiii",
          firstName: "Steak",
          lastName: "Boi",
          email: "ilovesteak@steak.com",
          hashedPassword: password1,
          bio: "This is a test! This test was written by Mustafa who done broke into Greg's steakboiiii account.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
