process.env.NODE_ENV = 'development';

import passport from 'passport';
// Strategy applies to facebook, if other strategies are used need refactor
import { Strategy } from 'passport-facebook';
import apiKeys from './oauth-keys';

const db = require('../db/users/User-db.js');
const User = require('../db/users/User');

/* Determine what data from the user object to
 * store in the session, in this case req.session.passport.user */
passport.serializeUser((user, done) => {
  console.log(`serializeUser ${user.id}`);
  done(null, user.id);
});

/* Lookup user object based on the key provided to serialize user use
 * entire user object is assigned to req.user */
passport.deserializeUser((id, done) => {
  console.log(`deserializeUser ${id}`);
  // Use id to read user object from a database, pass to done
  User.findOne({ where: { name: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log(err);
    });
});

passport.use(new Strategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,

// Facebook will send back the token and profile
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);

  // Find the user based on profile.id
  User.findOne({ where: { name: profile.id } })
    .then((errFindUser, user) => {
      console.log(`findOne ${profile.id}`);
      // If there is an err, return that error
      if (errFindUser) {
        console.log('error finding user');
        console.log(errFindUser);
        return done(errFindUser);
      }

      // If user is found, return that user to login
      if (user) {
        console.log(`user ${user}`);
        return done(null, user);
      }

      // If no user found, create newUser
      User.create({
        name: profile.id,
      })

      // Return newUser to login
      .then((newUser) => {
        console.log(`newUser ${newUser}`);
        return done(null, newUser);
      })

      // Catch error
      .catch((errCreateUser) => {
        console.log(errCreateUser);
        return done(errCreateUser);
      });

      return done(null, profile);
    // return done(null, profile);
    });
}));

export default passport;
