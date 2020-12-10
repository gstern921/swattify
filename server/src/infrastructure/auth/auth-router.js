const express = require('express');
const passport = require('passport');
const { OK } = require('http-status-codes');
const { SUCCESS } = require('../../config/app.config');

const router = express.Router();

// @desc  Auth with Google
// @route GET /auth/google
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc  Google Auth Callback
// @route GET /auth/google/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/', successRedirect: '/dashboard' }),
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(OK).json({ status: SUCCESS });
});

router.get('/login', passport.authenticate('github'), (req, res) => {
  console.log('req.user in /login: ', req.user);

  res.status(200).json(req.user);
});

module.exports = router;
