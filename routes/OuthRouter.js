const express = require("express");
const router = express.Router({mergeParams : true});
const passport = require("passport");
const {saveredirectedUrl} = require("../middleware.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const user = require("../models/user.js");
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate(
      { email: profile.emails[0].value },
      { email: profile.emails[0].value, username: profile.displayName , profilepic : profile.photos[0].value},
      function(err, user) {
        return cb(err, user);
      }
    );
  }
  ));

router.get('/' , passport.authenticate('google', { scope: ['profile' , 'email'] }));
   
router.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {

      // Successful authentication, redirect home.
      let redirect =  res.locals.redirectedUrl || "/listings";
      console.log(redirect);
      req.flash("sucess" , "welcome to wanderlust");
      res.redirect(redirect);
    });

module.exports = router;
