const { DataTypes } = require('sequelize');
const db = require('../../infrastructure/db/db');
const User = require('../user/UserModel');
const trimString = require('../../infrastructure/utils/nullsafeTrimString');

const Project = db.define(
  'projects',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'project name cannot be empty' },
        len: [1, 150],
      },
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    logoUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  },
);

Project.addHook('beforeValidate', (instance) => {
  const project = instance;
  project.name = trimString(project.name);
  project.description = trimString(project.description);
  project.password = trimString(project.password);
  // console.log('beforeValidate: ', instance)
});

User.hasMany(Project, { as: 'projectOwner' });
Project.belongsTo(User, { as: 'projectOwner' });
Project.belongsToMany(User, { through: 'projectUsers', timestamps: false });
User.belongsToMany(Project, { through: 'projectUsers', timestamps: false });

module.exports = Project;
