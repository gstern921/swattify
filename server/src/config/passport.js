const { Strategy: GitHubStrategy } = require('passport-github2');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = require('./app.config');
const User = require('../core/user/UserModel');

module.exports = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        let err = null;
        let user = null;
        try {
          user = await User.findOrCreate({
            where: {
              id: profile.id,
            },
            defaults: {
              name: profile.username,
            },
          });
        } catch (error) {
          err = error;
        }

        return done(err, user);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    // console.log('User', user);
    done(null, user);
  });

  passport.deserializeUser(async (u, done) => {
    let err = null;
    let user = null;

    try {
      user = await User.findByPk(u[0].id);
    } catch (error) {
      err = error;
    }

    done(err, user);
  });
};
