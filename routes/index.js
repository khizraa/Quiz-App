var express = require('express');
var router = express.Router();
var user_model = require('./users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(user_model.authenticate()));

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index.ejs");
});

router.get('/student_dashboard', isLoggedIn, function(req, res, next) {
  res.render("student_dashboard");
});

router.get('/student_signup', function(req, res, next) {
  res.render('student_signup');
});

router.post('/student_signup', function(req, res, next) {
  var user_details = new user_model({
    username: req.body.username,
    email: req.body.emailaddress
  });
  
  user_model.register(user_details, req.body.password)
    .then(function(registereduser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/student_dashboard');
      });
    }).catch(next);
});

router.get('/student_login', function(req, res, next) {
  res.render('student_login');
});

router.post('/student_login', passport.authenticate('local', {
  successRedirect: '/student_dashboard',
  failureRedirect: '/student_login'
}));

// --------------------------
router.get('/teacher_dashboard', isLoggedIn, function(req, res, next) {
  res.render("teacher_dashboard");
});

router.get('/teacher_signup', function(req, res, next) {
  res.render('teacher_signup');
});

router.post('/teacher_signup', function(req, res, next) {
  var user_details = new user_model({
    username: req.body.username,
    email: req.body.emailaddress
  });
  
  user_model.register(user_details, req.body.password)
    .then(function(registereduser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/teacher_dashboard');
      });
    }).catch(next);
});

router.get('/teacher_login', function(req, res, next) {
  res.render('teacher_login');
});

router.post('/teacher_login', passport.authenticate('local', {
  successRedirect: '/teacher_dashboard',
  failureRedirect: '/teacher_login'
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
