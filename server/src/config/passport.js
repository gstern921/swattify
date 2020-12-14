const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../core/user/UserModel');

module.exports = (passport) => {
  passport.use(
    'local-login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
          return done(null, false);
        }

        const passwordsMatch = await user.verifyPassword(password);

        if (!passwordsMatch) {
          return done(null, false);
        }
        // Successful Log In
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }),
  );

  passport.use(
    'local-register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, e, p, done) => {
      const { name, email, password, passwordConfirm, imageUrl } = req.body;

      try {
        let user = await User.findOne({ where: { email } });

        if (user) {
          return done(new Error('User already exists'), null);
        }

        if (password !== passwordConfirm) {
          return done(new Error('Passwords do not match'), null);
        }

        try {
          // console.log('Attempting to create: ', user);
          user = await User.create({ name, email, password, imageUrl });
          // console.log('After create: ', user);

          if (!user) {
            return done(new Error('Unable to register'), null);
          }

          user.password = undefined;
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      } catch (error) {
        return done(error, null);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    // console.log('serializeUser: ', user);
    // console.log('serializeUser, email: ', user.email);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // console.log('deserializeUser, id: ', email);
    let err = null;
    let user = null;

    try {
      user = await User.scope('self').findByPk(id);
      // console.log('deserializeUser, user: ', user);
    } catch (error) {
      // console.log('deserializeUser, error: ', error);
      err = error;
    }

    done(err, user);
  });
};
