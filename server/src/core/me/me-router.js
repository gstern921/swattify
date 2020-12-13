const express = require('express');
const { OK } = require('http-status-codes');
const { SUCCESS } = require('../../config/app.config');
const { ensureAuth } = require('../../infrastructure/auth/auth-middleware');

const router = express.Router();

router.get('/', ensureAuth, (req, res) => {
  res.status(OK).json({ status: SUCCESS, user: req.user });
});

module.exports = router;
