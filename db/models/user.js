'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING(280)
      }
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Like, { foreignKey: "userId" });
    User.hasMany(models.Post, { foreignKey: "authorId" });
    User.hasMany(models.Comment, { foreignKey: "userId" })
  };
  return User;
};