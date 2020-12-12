const { BAD_REQUEST } = require('http-status-codes');
const { FAIL } = require('../../config/app.config');

module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(BAD_REQUEST).json({ status: FAIL, message: 'You are already logged in' });
    }
    return next();
  },
};
