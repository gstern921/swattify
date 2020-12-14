const BugReport = require('./bug-report/BugReportModel');
const Project = require('./project/ProjectModel');
const ProjectUsers = require('./project-users/ProjectUsersModel');
const User = require('./user/UserModel');

User.hasMany(Project, { as: 'ownedProjects', foreignKey: 'projectOwnerId' });
Project.belongsTo(User, { as: 'projectOwner' });

Project.belongsToMany(User, { through: ProjectUsers, timestamps: false });
User.belongsToMany(Project, { through: ProjectUsers, timestamps: false });

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
User.hasMany(BugReport, { foreignKey: { field: 'bugReportCreator', allowNull: false }, onDelete: 'cascade' });
Project.hasMany(BugReport, {
  foreignKey: {
    field: 'bugReportProject',
    allowNull: false,
  },
  onDelete: 'cascade',
});

module.exports = {
  BugReport,
  Project,
  ProjectUsers,
  User,
};
