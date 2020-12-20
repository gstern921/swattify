const { Model } = require('sequelize');

const { nullsafeTrimString: trimString } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class BugReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BugReport.hasMany(models.BugReportComment, { as: 'comments',
        foreignKey: { name: 'bugReportId', allowNull: false },
      });

      BugReport.belongsTo(models.User, {
        foreignKey: {
          name: 'creator',
        },
      });
      BugReport.belongsTo(models.Project, {
        foreignKey: {
          name: 'project',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    }
  }
  BugReport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'bug report name cannot be empty' },
          len: [1, 150],
        },
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        validate: {
          len: [0, 1000],
        },
      },
      severity: {
        type: DataTypes.ENUM('low', 'minor', 'major', 'critical'),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high', 'immediate'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'resolved', 'declined', 'duplicate', 'invalid'),
        allowNull: false,
        defaultValue: 'open',
      },
    },
    {
      sequelize,
      modelName: 'BugReport',
      tableName: 'bugReports',
      freezeTableName: true,
      hooks: {
        beforeValidate: (instance) => {
          const bugReport = instance;
          bugReport.name = trimString(bugReport.name);
          bugReport.description = trimString(bugReport.description);
          // console.log('beforeValidate: ', instance)
        },
      },
    },
  );
  return BugReport;
};
