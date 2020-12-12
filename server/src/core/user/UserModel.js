const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const db = require('../../infrastructure/db/db');
const { BCRYPT_SALT_ROUNDS } = require('../../config/app.config');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isAlphanumeric: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://swattify-media.s3.amazonaws.com/default-user-icon-8.jpg',
    validate: {
      isUrl: true,
    },
  },
});

User.beforeCreate(async (user) => {
  const u = user;
  const hashedPassword = await bcryptjs.hash(user.password, BCRYPT_SALT_ROUNDS);
  u.password = hashedPassword;
});

User.beforeValidate((user) => {
  const u = user;
  if (u.email) {
    u.email = u.email.toLowerCase();
  }
});

module.exports = User;
