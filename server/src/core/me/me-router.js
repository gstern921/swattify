const express = require('express');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { SUCCESS, ERROR } = require('../../config/app.config');
const { ensureAuth } = require('../../infrastructure/auth/auth-middleware');
const { catchAsync } = require('../../utils/catchAsync');
const { getAllProjectsByUserId } = require('../project/projectController');
const Project = require('../project/ProjectModel');

const router = express.Router();

router.use(ensureAuth);

router.get('/', (req, res) => {
  res.status(OK).json({ status: SUCCESS, user: req.user });
});

router.get(
  '/projects',async (req, res) => {
    const userId = req.user.id;
    try {
      const projects = await getAllProjectsByUserId(userId);
      return res.status(OK).json({ status: SUCCESS, projects });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, err });
    }
  },
);

module.exports = router;
