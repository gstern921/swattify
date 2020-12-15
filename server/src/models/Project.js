const { Model } = require('sequelize');

const { nullsafeTrimString: trimString } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { as: 'projectOwner', foreignKey: { name: 'projectOwnerId' } });

      Project.belongsToMany(models.User, {
        through: 'ProjectUsers',
        timestamps: false,
        foreignKey: {
          name: 'projectId',
          allowNull: false,
        },
      });

      Project.hasMany(models.BugReport, {
        foreignKey: {
          name: 'project',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
    }
  };
  Project.init({
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
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    freezeTableName: true,
    hooks: {
      beforeValidate: (instance) => {
        const project = instance;
        project.name = trimString(project.name);
        project.description = trimString(project.description);
        project.password = trimString(project.password);
        // console.log('beforeValidate: ', instance)
      },
    },
  });

  // Project.create({},{include: {model: User, as: 'projectOwner', }})
  return Project;
};
