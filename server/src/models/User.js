const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs');
const { BCRYPT_SALT_ROUNDS, MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH } = require('../config/app.config');
const { nullsafeTrimString: trimString } = require('../utils');
const { nullsafeToLower: toLower } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, { as: 'projectOwner', foreignKey: { name: 'projectOwnerId', allowNull: false } });
      User.hasMany(models.BugReportComment, { foreignKey: { name: 'userId' }});
      User.belongsToMany(models.Project, {
        through: 'ProjectUsers',
        timestamps: false,
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      });
      User.hasMany(models.BugReport, { foreignKey: { name: 'creator', allowNull: false }, onDelete: 'cascade' });
    }

    async verifyPassword(password) {
      // console.log(this);
      if (!password) {
        return false;
      }
      const matches = await bcryptjs.compare(password, this.password);
      return matches;
    }
  }
  User.init({
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
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    freezeTableName: true,
    defaultScope: {
      attributes: {
        exclude: ['password', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          exclude: [],
        },
      },
      self: {
        attributes: {
          exclude: ['password'],
        },
      },
    },
    hooks: {
      beforeValidate: (instance) => {
        const user = instance;
        user.email = toLower(trimString(user.email));
        user.name = trimString(user.name);
        user.password = trimString(user.password);
        user.imageUrl = trimString(user.imageUrl);
      },
      beforeCreate: async (instance) => {
        const user = instance;
        const hashedPassword = await bcryptjs.hash(user.password, BCRYPT_SALT_ROUNDS);
        user.password = hashedPassword;
      },
    },
  });
  return User;
};
