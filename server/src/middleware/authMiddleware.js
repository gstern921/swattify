const { StatusCodes } = require('http-status-codes');
const { FAIL, SUCCESS } = require('../config/app.config');
const { ProjectUsers } = require('../models');

const { BAD_REQUEST, UNAUTHORIZED, OK } = StatusCodes;

module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(BAD_REQUEST).json({ status: FAIL, message: 'You are not logged in' });
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(BAD_REQUEST).json({ status: FAIL, message: 'You are already logged in' });
    }
    return next();
  },
  ensureProjectMember: (projectIdParamName) => async (req, res, next) => {
    if (!req.user) {
      return res.status(BAD_REQUEST).json({ status: FAIL, message: 'You are not logged in' });
    }

    const userId = req.user.id;
    const projectId = req.params[projectIdParamName];

    const projects = await ProjectUsers.findAll({
      where: {
        userId,
        projectId,
      },
      limit: 1,
    });

    const isMember = projects.length > 0;
    console.log('isMember: ', isMember);

    // console.log('ProjectUsers: ', ProjectUsers.find);
    // console.log('isMember: ', isMember);

    if (!isMember) {
      return res.status(UNAUTHORIZED).json({ status: FAIL, message: 'You are not a member of that project' });
    }

    return next();
  },
};
