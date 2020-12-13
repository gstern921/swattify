const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const db = require('../../infrastructure/db/db');
const { BCRYPT_SALT_ROUNDS, MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH } = require('../../config/app.config');
const trimString = require('../../infrastructure/utils/nullsafeTrimString');
const toLower = require('../../infrastructure/utils/nullsafeToLowerCase');

const User = db.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'username cannot be empty' },
        is: /^[a-zA-Z ]+$/g,
        len: [1, 60],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH],
          msg: `Password should be between ${MINIMUM_PASSWORD_LENGTH} and ${MAXIMUM_PASSWORD_LENGTH} characters long`,
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://swattify-media.s3.amazonaws.com/default-user-icon-8.jpg',
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          exclude: [],
        },
      },
    },
  },
);

User.addHook('beforeValidate', (instance) => {
  const user = instance;
  user.email = toLower(trimString(user.email));
  user.name = trimString(user.name);
  user.password = trimString(user.password);
  user.imageUrl = trimString(user.imageUrl);
  // console.log('beforeValidate: ', instance);
});

User.addHook('beforeCreate', async (instance) => {
  const user = instance;
  const hashedPassword = await bcryptjs.hash(user.password, BCRYPT_SALT_ROUNDS);
  user.password = hashedPassword;
  // console.log('beforeCreate: ', instance)
});
User.prototype.verifyPassword = async function (password) {
  // console.log(this);
  if (!password) {
    return false;
  }
  const matches = await bcryptjs.compare(password, this.password);
  return matches;
};

module.exports = User;
