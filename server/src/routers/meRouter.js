const express = require('express');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { SUCCESS, ERROR } = require('../config/app.config');
const { ensureAuth } = require('../middleware/authMiddleware');
const { getAllProjectsByUserId } = require('../controllers/projectController');

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
