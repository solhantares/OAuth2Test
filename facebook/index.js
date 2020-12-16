

const express = require("express");
const passport = require("passport");
const cookieSession = require('cookie-session');

require('./passport-setup');

const app = express();


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(cookieSession({
    name: "sol test session",
    keys: ['key1', 'key2']
}));

app.use(passport.initialize()); 
app.use(passport.session());
 
app.get("/", (req, res) => {
    res.send("hello from sol test facebook Oath2, You are not logged in.");
});
app.get("/success", isLoggedIn, (req, res) => {
    res.send("hello from sol test facebook Oath2 has SUCCESSFULLY loged in for " + req.user.displayName);
    // console.log ("req = " , req);
});
app.get("/failure", (req, res) => {
    res.send("hello from sol test facebook Oath2 has FAILED to login");
});

app.get('/facebook',
    passport.authenticate('facebook', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    })
);
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
    console.log("logout called");
 
})

app.listen(3000, () => console.log("Listening on port 3000..."));