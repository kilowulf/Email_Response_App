const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import client keys object
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

// import user model class schema
const User = mongoose.model("users");

// passportJs - authentication flow: facilitate OAuth (google authentication)
//            - automates OAuth flow
//            - uses two libraries: passport and passport strategy
//           Passport: general handler for auth in express app
//           Passport Strategy: helpers for authenticating with specific method or provider (email/password, google, facebook)

// passport allows a third party authentication via a token
// cookie session validation / authentication strategy

// create instance of Google Oauth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      // Query user collection for google id
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // user has record
        } else {
          // user doesn't exist , need to generate record
          // save google profile id data in mongo user collection
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);
