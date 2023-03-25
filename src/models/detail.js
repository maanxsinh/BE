"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail.init(
    {
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      detail: DataTypes.TEXT,
      cure: DataTypes.TEXT,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Detail",
    }
  );
  Detail.associate = function (models) {
    models.Detail.belongsTo(models.User, { foreignKey: "doctorId" });
  };
  return Detail;
};
