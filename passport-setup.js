const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = "689715110106-aj705j86mhgn59sc31g415cddrqkb4hu.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "-UZlCooLj4aNHfScYAGZaqmg";

passport.serializeUser(function (user, done) {
  console.log("serializeUser called user = " , user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // User.findById(id, function(err, user) {
    console.log("deserializeUser called, user = " ,user);
    done(null, user);
  // });
});
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    console.log("done, profile = ", profile);
    return done(null, profile);
    // });
  }
));