const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BugReportComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BugReportComment.belongsTo(models.BugReport, { foreignKey: { name: 'bugReportId'} });
      BugReportComment.belongsTo(models.User, { foreignKey: {
        name: 'userId',
      } });
    }
  };
  BugReportComment.init({
    text: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: [0, 500],
      },
    },
  }, {
    sequelize,
    modelName: 'BugReportComment',
    tableName: 'bugReportComments',
    freezeTableName: true,
  });
  return BugReportComment;
};