import { DataTypes } from 'sequelize';
import db from '../config/db';

const User = db.define('User', {
  github_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.CHAR(72),
    allowNull: false,
  },
});
