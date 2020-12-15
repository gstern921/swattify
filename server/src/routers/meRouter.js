const express = require('express');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { SUCCESS, ERROR } = require('../config/app.config');
const { ensureAuth } = require('../middleware/authMiddleware');
const { getAllProjectsByUserId } = require('../controllers/projectController');

const router = express.Router();

router.use(ensureAuth);

router.get('/', (req, res) => res.status(OK).json({ status: SUCCESS, user: req.user }));

router.get('/projects', (req, res) => getAllProjectsByUserId(req.user.id)(req, res));

module.exports = router;
