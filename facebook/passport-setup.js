const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = "1090359881395531";
const FACEBOOK_APP_SECRET = "5c1d00e374dcd87891d70ac984f904e9";
const CALLBACK_URL = "http://localhost:3000/facebook/callback";

passport.serializeUser(function (user, done) {
    console.log("serializeUser called user = ", user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById(id, function(err, user) {
    console.log("deserializeUser called, user = ", user);
    done(null, user);
    // });
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback: true
    },
        function (token, refreshToken, profile, done) {
            console.log("done, profile = ", profile);
            return done(null, profile);
        }
));