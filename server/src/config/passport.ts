import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } from '../config/app.config';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStatic } from 'passport';

export default (passport: PassportStatic) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID as string,
        clientSecret: GITHUB_CLIENT_SECRET as string,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      function (accessToken: string, refreshToken: string, profile: Map<string, any>, done: Function) {
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
