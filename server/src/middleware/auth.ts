import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';

export default {
  ensureAuth: function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },
  ensureGuest: function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
    }
    return next();
  },
};
