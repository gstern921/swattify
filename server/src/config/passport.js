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
          [user] = await User.findOrCreate({
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

        // console.log('Strategy User: ', user);

        return done(err, user);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    // console.log('User: ', user);
    // console.log('typeof user: ', typeof user.id);
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
