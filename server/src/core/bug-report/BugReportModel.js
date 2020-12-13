const { DataTypes } = require('sequelize');
const db = require('../../infrastructure/db/db');
const User = require('../user/UserModel');
const Project = require('../project/ProjectModel');
const trimString = require('../../infrastructure/utils/nullsafeTrimString');

const BugReport = db.define(
  'bugReports',
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
  {
    freezeTableName: true,
  },
);

BugReport.addHook('beforeValidate', (instance) => {
  const bugReport = instance;
  bugReport.name = trimString(bugReport.name);
  bugReport.description = trimString(bugReport.description);
  // console.log('beforeValidate: ', instance)
});

BugReport.belongsTo(User, {
  foreignKey: {
    field: 'bugReportCreator',
    allowNull: false,
  },
  onDelete: 'cascade',
});
BugReport.belongsTo(Project, {
  foreignKey: {
    field: 'bugReportProject',
    allowNull: false,
  },
  onDelete: 'cascade',
});
BugReport.belongsToMany(User, { through: 'userBugReports', timestamps: false });
User.belongsToMany(BugReport, { through: 'userBugReports', timestamps: false });
BugReport.belongsToMany(Project, { through: 'projectBugReports', timestamps: false });
Project.belongsToMany(BugReport, { through: 'projectBugReports', timestamps: false });

module.exports = BugReport;
