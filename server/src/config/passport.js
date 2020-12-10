import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } from '../config/app.config';
import { Strategy as GitHubStrategy } from 'passport-github2';

export default (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        done(null, {});
        // let err = null;
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // return done(err, user);
        // }
        // );
      },
    ),
  );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser((id, done) =>
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   }),
  // );
};
