const { Model } = require('sequelize');

const { nullsafeTrimString: trimString } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class ProjectUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  ProjectUsers.init({
  }, {
    sequelize,
    modelName: 'ProjectUsers',
    tableName: 'projectUsers',
    freezeTableName: true,
  });
  return ProjectUsers;
};
