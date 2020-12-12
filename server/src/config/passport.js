const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../core/user/UserModel');

module.exports = (passport) => {
  passport.use(
    'local-login',
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
          return done(null, false);
        }

        const passwordsMatch = await user.passwordMatches(password);

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

        if (!name || !email || !password || !passwordConfirm) {
          return done(new Error('Missing registration information'), null);
        }

        if (password !== passwordConfirm) {
          return done(new Error('Passwords do not match'), null);
        }

        try {
          user = await User.create({ name, email, password, image_url: imageUrl });

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
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let err = null;
    let user = null;

    try {
      user = await User.findByPk(id);
    } catch (error) {
      err = error;
    }

    done(err, user);
  });
};
