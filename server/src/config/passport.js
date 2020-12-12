const { Strategy: LocalStrategy } = require('passport-local');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../core/user/UserModel');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (usernameOrEmail, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [{ username: usernameOrEmail, email: usernameOrEmail }],
          },
        });
        if (!user) {
          return done(null, false);
        }

        const passwordsMatch = await bcryptjs.compare(password, user.password);
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
