const { DataTypes } = require('sequelize');
const db = require('../../infrastructure/db/db');
const User = require('../user/UserModel');
const Project = require('../project/ProjectModel');

const ProjectUsers = db.define(
  'projectUsers',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: User,
      onDelete: 'cascade',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: Project,
      onDelete: 'cascade',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

module.exports = ProjectUsers;
