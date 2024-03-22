// // var GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const passport = require("passport");


// // require("dotenv").config();
 
// // passport.use(new GoogleStrategy({
// //     clientID: GOOGLE_CLIENT_ID,
// //     clientSecret: GOOGLE_CLIENT_SECRET,
// //     callbackURL: "http://localhost:3000/auth/google/callback",
// //     scope:["profile","email"]
// //   },
// //   function(accessToken, refreshToken, profile, cb) {
// //     console.log("from Google Oauth file which is a Calback :",profile)
// //     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //       return cb(null, profile);
// //     // });
// //   }
// // ));
// // module.exports = { passport };


// const passport = require("passport");

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//  new GoogleStrategy(
//         {
//  clientID: "",
//  clientSecret: "",
//  callbackURL: "/auth/google/callback",
//         },
//  function (accessToken, refreshToken, profile, done)  {
//  done(null, profile);
//  console.log(profile)
//         }
//       )
//     )
 
//  passport.serializeUser((user, done) => {
//  done(null, user);
//     });
 
//  passport.deserializeUser((user, done) => {
//  done(null, user);
//     });




const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const passport = require("passport");


passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = {
        name: profile._json.name,
        email: profile._json.email,
        // password: uuidv4(),
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

