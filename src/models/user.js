"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fulltName: DataTypes.STRING,
      position: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      typeRole: DataTypes.STRING,
      speciality: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = function (models) {
    models.User.hasMany(models.Booking, {
      foreignKey: "doctorId",
    });
    models.User.hasMany(models.Booking, {
      foreignKey: "patientId",
    });
    models.User.hasMany(models.Detail, {
      foreignKey: "doctorId",
    });
  };
  return User;
};
