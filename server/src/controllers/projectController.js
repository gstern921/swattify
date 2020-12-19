const { StatusCodes } = require('http-status-codes');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { Project, User } = require('../models');
const { catchAsync } = require('../utils/index');
const db = require('../models').sequelize;

const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = StatusCodes;

exports.getAllProjectsByUserId = (userId) => async (req, res) => {
  try {
    const user = await User.findByPk(userId);
    // console.log(ProjectUsers.findAll);
    const totalCount = await user.countProjects();
    const projects = await user.getProjects({
      include: [{ model: User, through: { attributes: [] } }],
      limit: req.paginateLimit,
      offset: req.paginateOffset,
    });
    const count = projects.length;
    return res.status(OK).json({ status: SUCCESS, count, totalCount, message: 'Successfully found projects', data: { projects } });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to find projects', data: err });
  }
};

exports.getProjectById = (projectId) =>
  catchAsync(async (req, res) => {
    const { user } = req;
    const id = projectId;

    // User.findAll({include: {attributes: {},through: {}})
    const projects = await user.getProjects({
      where: {
        id,
      },
      include: [{ model: User, through: { attributes: [] } }],
    });
    return projects;
  });

exports.createProject = catchAsync(async (req, res) => {
  const { name, description, logoUrl, isPublic } = req.body;

  const { user } = req;
  try {
    const newProject = await db.transaction(async (transaction) => {
      const project = await user.createProject(
        {
          name,
          description,
          logoUrl,
          isPublic,
          projectOwnerId: user.id,
        },
        { transaction },
      );

      return project;
    });

    if (newProject) {
      return res
        .status(OK)
        .json({ status: SUCCESS, message: 'Project created successfully', data: { project: newProject } });
    }

    return res.status(BAD_REQUEST).json({ status: FAIL, message: 'Cannot create new project', data: null });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to create project', data: null });
  }
});

exports.deleteProjectById = (projectId) => async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await Project.destroy({
      where: {
        id: projectId,
        projectOwnerId: userId,
      },
    });
    console.log('project destroy result: ', result);
    if (!result) {
      return res.status(BAD_REQUEST).json({
        status: FAIL,
        message: 'Unable to delete project',
      });
    }
    return res.status(OK).json({ status: SUCCESS, message: 'Project successfully deleted', data: { count: result } });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: ERROR,
      message: 'Unable to delete project, something went wrong',
      data: err,
    });
  }
};
