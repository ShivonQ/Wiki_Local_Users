var express = require('express');
var router = express.Router();
var NPC = require('../models/npc.js');
var City = require('../models/city.js');
var Shop = require('../models/shop.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Welcome To Archaevas Wiki 1.0'});
});
router.get('/map', function (req, res, next) {
    res.render('map', {title: 'Archaevas Map'})
});
router.get('/npcs', function (req, res, next) {
    NPC.find({}, function (err, all_npc_docs) {
        if (err) {
            return next(err);
        }
        City.find({}, function (err, all_cities_docs) {
            if (err) {
                return next(err);
            }
            return res.render('npcs', {
                title: ' All NPCs ',
                NPCs: all_npc_docs,
                Cities: all_cities_docs,
                error: req.flash('There was an error retrieving the NPC data from the Database')
            })
        })
    })
});
router.get('/all_cities', function (req, res, next) {
    City.find({}, function (err, all_cities_docs) {
        if (err) {
            return next(err);
        }
        return res.render('all_cities', {
            title: 'All Currently Created Cities',
            Cities: all_cities_docs,
            error: req.flash('There was an error retrieving the list of Cities')
        })
    })
});
router.get('/city/:city_name', function (req, res, next) {
    var city_name = req.params.city_name;
    if(city_name.charAt(0)==':'){
        city_name=city_name.slice(1)
    }
    console.log(req);
    City.find({city_name: city_name}, function (err, this_city_doc) {
        if (err) {
            return next(err);
        }
        NPC.find({'current_city': city_name}, function (err, these_npcs_doc) {
            if (err) {
                return next(err)
            }
            Shop.find({'location': city_name}, function (err, shops_doc) {
                if (err) {
                    return next(err);
                }
                console.log(city_name+' is the city_name variable');
                console.log('++++++++++++++++++++++ this_city_doc +++++++++++++++++++++++++++++++'+JSON.stringify(this_city_doc)+'+++++++++++++++++++++++ end of this_city_doc +++++++++++++++++++')
                console.log('%%%%%%%%%%%%%%%%%%%%%% these_npcs_doc %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'+JSON.stringify(these_npcs_doc)+'%%%%%%%%%%%%%%%%%%%%%% end of these_npcs_doc %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                console.log('&&&&&&&&&&&&&&&&&&&&&& shop_doc &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'+JSON.stringify(shops_doc)+'&&&&&&&&&&&&&&&&&&&&&& end of shop_doc &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
                return res.render('city', {
                    title: city_name,
                    City: this_city_doc,
                    NPCs: these_npcs_doc,
                    Shops: shops_doc
                })
            })
        })
    })
})
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