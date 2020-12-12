const express = require('express');
const passport = require('passport');
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { CLIENT_URL, SUCCESS, FAIL, ERROR } = require('../../config/app.config');
const { ensureGuest } = require('./auth-middleware');
const User = require('../../core/user/UserModel');

const router = express.Router();

router.post('/register', ensureGuest, async (req, res, next) => {
  await passport.authenticate('local-register', (err, user, a, b) => {
    if (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to register' });
    }
    res.status(OK).json({ status: SUCCESS, user });
  })(req, res, next);
});

router.post(
  '/login',
  ensureGuest,
  passport.authenticate('local-login', { failureRedirect: `${CLIENT_URL}/login?err=invalidUserNameOrPassword` }),
  (req, res) => res.status(OK).json({ status: SUCCESS, user: req.user }),
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(OK).json({ status: SUCCESS });
});

module.exports = router;
