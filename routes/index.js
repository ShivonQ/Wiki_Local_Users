var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/map', function(req,res,next){
  res.render('map',{ title:'Archaevas Map' })
});

module.exports = router;

/*
/*var express = require('express');
 var router = express.Router();
 var passport=require('passport');
 /* GET home/login page. */
/*
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req,res,next){
  res.render('signup',{message:req.flash('signupMessage') } )
});

router.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/tasks',
  failureRedirect:'/signup',
  failureFlash:true
}));
router.post('/login',passport.authenticate('local-login',{
  successRedirect:'/tasks',
  failureRedirect:'/',
  failureFlash:true
}));
//get the logout 'page'
router.get('/logout', function(req,res,next){
  req.logout();
  res.redirect('/');
});

//function for are they logged in?!!?!? not ogged in = back to homepage.
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
module.exports = router;
*/