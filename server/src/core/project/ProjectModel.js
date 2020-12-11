const { DataTypes } = require('sequelize');
const db = require('../../infrastructure/db/db');

const Project = db.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Project;
