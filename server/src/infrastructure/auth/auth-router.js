const express = require('express');
const passport = require('passport');
const { OK } = require('http-status-codes');
const { CLIENT_URL, SUCCESS } = require('../../config/app.config');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: `${CLIENT_URL}/login?err=invalidUserNameOrPassword` }),
  (req, res) => res.status(OK).json({status: SUCCESS, user: req.user }),
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(OK).json({ status: SUCCESS });
});

module.exports = router;
