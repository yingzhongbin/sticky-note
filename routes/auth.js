var express = require('express');
var router = express.Router();
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
      clientID: 'f1171d4773dcf679738f',
      clientSecret: '58fbf8119b3b6e78349531f8313e2bab8ad07ffa',
      callbackURL: "http://yingzhongbin.top/auth/github/callback"
      // clientID: '6d8965aea7ff255e1c50',
      // clientSecret: '623b3daceb36abd1bba0fb500c2bf93727229f4a',
      // callbackURL: "http://127.0.0.1:2988/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // });
      done(null, profile);
    }
));

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      console.log('========reqreqreqreqreqreqreqreqreq=======');
      req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
      };
      console.log(req.session.user);
      res.redirect('/');
    });
router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})
module.exports = router;
