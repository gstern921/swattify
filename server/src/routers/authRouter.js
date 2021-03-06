const express = require('express');
const passport = require('passport');
const { StatusCodes} = require('http-status-codes');
const { CLIENT_URL, SUCCESS, FAIL, ERROR, SESSION_COOKIE_NAME } = require('../config/app.config');
const { ensureGuest } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

const router = express.Router();

router.post('/register', ensureGuest, async (req, res, next) => {
  // console.log('in local register');
  passport.authenticate('local-register', (err, u) => {
    // console.log('in local register 2, err: ', err);
    console.log(err);
    if (err) {
      return res.status(BAD_REQUEST).json({ status: ERROR, message: err.message });
    }
    req.logIn(u, (error) => {
      // console.log('error: ', error);
      // return res.status(OK).json({ status: SUCCESS, error, user: req.user });
      if (error) {
        return res.status(BAD_REQUEST).json({ status: ERROR, message: err.message });
      }
      return res.status(OK).json({ status: SUCCESS, message: 'Signed in', user: req.user });
    });
    // return res.status(OK).json({ status: SUCCESS, err, user, info });
  })(req, res, next);
  // console.log('after local register 2');
});
// );
// console.log('in register', req.body);
// await passport.authenticate('local-register', (err, user) => {
//   if (err) {
//     console.log(err);
//     return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to register' });
//   } else {
//     req.logIn(user, function (error) {
//       if (error) {
//         return res
//           .status(INTERNAL_SERVER_ERROR)
//           .json({ status: ERROR, message: 'Unable to login after registering' });
//       } else {
//         return res.status(OK).json({ status: SUCCESS, message: 'Signed in', user });
//       }
//     });
//   }
// })(req, res, next);
// });

router.post('/login', ensureGuest, (req, res, next) => {
  passport.authenticate('local-login', (err, user) => {
    // return res.status(OK).json({ err, user, info });
    if (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: err.message });
    }
    if (!user) {
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to log in' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: err.message });
      }
      return res.status(OK).json({ status: SUCCESS, data: user });
    });
  })(req, res, next);
});

router.get('/test', (req, res) => {
  res.cookie('test', '1234');
  res.status(200).json('success');
});

router.get('/logout', (req, res) => {
  console.log('logout user: ', req.user);
  req.logOut();
  res.clearCookie(SESSION_COOKIE_NAME);
  res.status(OK).json({ status: SUCCESS });
});

module.exports = router;
