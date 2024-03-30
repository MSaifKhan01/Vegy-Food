

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const passport = require("passport");


passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      // callbackURL: "https://vegy-food.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = {
        username: profile._json.name,
        email: profile._json.email,
      
        avtar: profile._json.picture,
        accessToken
      };

    //   console.log("tokens here ------- :> ",accessToken,)
    // console.log("goooglel-------: ",profile)
      return cb(null, user);
    }
  )
);

module.exports = { passport };

