const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');

const { getAllProjectsByUserId } = require('../controllers/projectController');
const { ensureAuth } = require('../middleware/authMiddleware');
const { paginate, selectFields } = require('../middleware/queryMiddleware');

const {
  SUCCESS,
  USER_SELECTABLE_FIELDS,
} = require('../config/app.config');

const { OK } = StatusCodes;

const router = Router();

router.get('/me', ensureAuth, (req, res) => res.status(OK).json({ status: SUCCESS, user: req.user }));

router.get('/me/projects',
  ensureAuth,
  paginate({
    maximumPageSize: 20,
    defaultPageSize: 20,
  }),
  selectFields(USER_SELECTABLE_FIELDS),
  (req, res) => getAllProjectsByUserId(req.user.id)(req, res));

router.get('/:id/projects', paginate({ maximumPageSize: 1, defaultPageSize: 1 }), ensureAuth, (req, res) => getAllProjectsByUserId(req.params.id)(req, res));


module.exports = router;
