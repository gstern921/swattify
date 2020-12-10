import express from 'express';
import passport from 'passport';
import { OK } from 'http-status-codes';
import { SUCCESS } from '../config/app.config';

const router = express.Router();

// @desc  Auth with Google
// @route GET /auth/google
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc  Google Auth Callback
// @route GET /auth/google/callback
router.get(
  '/github/callback',
  (req, _res, next) => {
    console.log(req.query);
    return next();
  },
  passport.authenticate('github', { failureRedirect: '/' }),
  (_req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  },
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(OK).json({ status: SUCCESS });
});

export default router;
