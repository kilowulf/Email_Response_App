const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import client keys object
// const keys = require("../config/keys.js");
const mongoose = require("mongoose");

// import user model class schema
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // user.id is the mongo id
  // use mongo id since users may have multiple provider id's
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true // allows for hosting on third parties / proxies
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      // Query user collection for google id
      const existingUser = await User.findOne({ googleId: profile.id });
      // check if user exists
      if (existingUser) {
        // user has record
        done(null, existingUser);
      } else {
        // user doesn't exist , need to generate record
        // save google profile id data in mongo user collection
        const user = await new User({ googleId: profile.id }).save(); // save record
        done(null, user); // second user instance from callback
      }
    }
  )
);
