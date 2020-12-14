const { Project, User, ProjectUsers } = require('../models');
const db = require('../models').sequelize;

exports.getAllProjectsByUserId = async (userId) => {
  const user = await User.findByPk(userId);
  console.log(user);
  // User.findAll({include: {attributes: {},through: {}})
  const projects = await user.getProjects({
    include: [{ model: User, through: { attributes: [] } }],
  });
  return projects;
};

exports.createProject = async ({
  name, description, logoUrl, isPublic,
}, user) => {
  console.log(user.id)
  const newProject = await db.transaction(async (transaction) => {
    const project = await Project.create(
      {
        name,
        description,
        logoUrl,
        isPublic,
        projectOwnerId: user.id,
      },
      { transaction },
    );

    await ProjectUsers.create({ userId: user.id, projectId: project.id }, { transaction });

    return project;
  });

  return newProject;

  // If the execution reaches this line, the transaction has been committed successfully
  // `result` is whatever was returned from the transaction callback (the `user`, in this case)
};

exports.deleteProjectById = async ({ id, userId }) => {
  const result = await Project.destroy({
    where: {
      id,
      projectOwnerId: userId,
    },
  });
  return result;
};
