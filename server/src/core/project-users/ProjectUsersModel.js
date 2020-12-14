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
      references: User,
      onDelete: 'cascade',
      unique: 'unique-project-user-pair',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: Project,
      onDelete: 'cascade',
      unique: 'unique-project-user-pair',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

module.exports = ProjectUsers;
