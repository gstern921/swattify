const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');

const { getAllProjectsByUserId } = require('../controllers/userController');
const { ensureAuth } = require('../middleware/authMiddleware');
const { SUCCESS } = require('../config/app.config');

const { OK } = StatusCodes;

const router = Router();

router.get('/me', ensureAuth, (req, res) => res.status(OK).json({ status: SUCCESS, user: req.user }));

router.get('/me/projects', ensureAuth, (req, res) => getAllProjectsByUserId(req.user.id)(req, res));

module.exports = router;
