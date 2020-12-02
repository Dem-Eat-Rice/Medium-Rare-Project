"use strict";
const bcyrpt = require('bcryptjs');


module.exports = {
  up: async(queryInterface, Sequelize) => {
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
