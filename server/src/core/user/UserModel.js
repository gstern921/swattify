const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const db = require('../../infrastructure/db/db');
const { BCRYPT_SALT_ROUNDS, MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH } = require('../../config/app.config');

const User = db.define(
  'user',
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
    image_url: {
      type: DataTypes.STRING,
      defaultValue: 'https://swattify-media.s3.amazonaws.com/default-user-icon-8.jpg',
      validate: {
        isUrl: true,
      },
    },
  },
  {
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
  user.email = user.email.toLowerCase().trim();
  user.name = user.name.trim();
  user.password = user.password.trim();
  // console.log('beforeValidate: ', instance)
});

User.addHook('beforeCreate', async (instance) => {
  const user = instance;
  const hashedPassword = await bcryptjs.hash(user.password, BCRYPT_SALT_ROUNDS);
  user.password = hashedPassword;
  // console.log('beforeCreate: ', instance)
});
User.prototype.verifyPassword = async function (password) {
  // console.log(this);
  const matches = await bcryptjs.compare(password, this.password);
  return matches;
};

module.exports = User;
