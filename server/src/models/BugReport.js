const {
  Model
} = require('sequelize');

const trimString = require('../utils/nullsafeTrimString');

module.exports = (sequelize, DataTypes) => {
  class BugReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BugReport.belongsTo(models.User, {
        foreignKey: {
          field: 'bugReportCreator',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
      BugReport.belongsTo(models.Project, {
        foreignKey: {
          field: 'bugReportProject',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
    }
  }
  BugReport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'bug report name cannot be empty' },
        len: [1, 150],
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        validate: {
          len: [0, 1000],
        },
      },
      severity: {
        type: DataTypes.ENUM('critical', 'major', 'minor', 'low'),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('immediate', 'high', 'medium', 'low'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'resolved', 'declined', 'invalid', 'duplicate'),
        allowNull: false,
        defaultValue: 'open',
      },
    },
  }, {
    sequelize,
    modelName: 'bugReports',
    freezeTableName: true,
    hooks: {
      beforeValidate: (instance) => {
        const bugReport = instance;
        bugReport.name = trimString(bugReport.name);
        bugReport.description = trimString(bugReport.description);
        // console.log('beforeValidate: ', instance)
      },
    },
  });
  return BugReport;
};
