var express = require('express');
var router = express.Router();
var passport = require('passport');

var NPC = require('../models/npc.js');
var City = require('../models/city.js');
var Shop = require('../models/shop.js');
var User = require('../models/user.js');
var PC = require('../models/playerChar.js');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Welcome To Archaevas Wiki 1.0'});
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {message: req.flash('signupMessage')})
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/index',
    failureRedirect: '/signup',
    failureFlash: true
}));

//router.post('/', passport.authenticate('local-login', {
//    sucessRedirect: '/',
//    failureRedirect: '/',
//    failureFlash: true
//}));

router.get('/map', isLoggedIn, function (req, res, next) {
    res.render('map', {title: 'Archaevas Map', user: req.user})
});

router.get('/index', isLoggedIn, function (req, res, next) {
    var username = req.user.local.username
    res.render('index', {title: 'Welcome to Archaevas Wiki 1.0', user: req.user})
})

router.get('/npcs', isLoggedIn, function (req, res, next) {
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
                user: req.user,
                error: req.flash('There was an error retrieving the NPC data from the Database')
            })
        })
    })
});
router.get('/one_npc/:name', isLoggedIn, function (req, res, next) {
    var isAdmin = req.user.isAdmin;
    var npc_name = req.params.name;
    if (npc_name.charAt(0) == ':') {
        npc_name = npc_name.slice(1)
    }
    NPC.findOne({name: npc_name}, function (err, this_npc_doc) {
        if (err) {
            return next(err)
        }
        City.find({}, function (err, all_cities_docs) {
            if (err) {
                return next(err);
            }
            Shop.findOne({owner: npc_name}, function (err, this_shop_doc) {
                if (err) {
                    return next(err)
                }
                if (this_shop_doc == null) {
                    this_shop_doc = '';
                }
                return res.render('one_npc', {
                    title: npc_name,
                    NPC: this_npc_doc,
                    Cities: all_cities_docs,
                    Shop: this_shop_doc,
                    user_cred: isAdmin
                })
            })
        })
    })
});
router.get('/all_PCs', isLoggedIn, function(req,res,next){
    PC.find({},function(err, all_PC_docs){
        if (err){
            return(next(err))
        }
        return res.render('all_PCs',{
            title:'Every Player\'s Character',
            PCs:all_PC_docs,
            user:req.user
        })
    })
});
router.get('/a_PC/:PC_name',isLoggedIn,function(req,res,next){
    //console.log(req)
    var pc_name=req.params.PC_name;
    if(pc_name.charAt(0)==':'){
        pc_name=pc_name.slice(1);
    }
    PC.findOne({character_name:pc_name}, function(err,this_pc_doc){
        if(err){
            return next(err)
        }
        City.find({},function(err,all_cities_docs){
            if(err){
                return next(err)
            }
            return res.render('a_PC', {
                title:'Single Player Character Page',
                PC:this_pc_doc,
                Cities:all_cities_docs,
                user:req.user
            })
        })
    })
})

router.get('/all_cities', isLoggedIn, function (req, res, next) {
    City.find({}, function (err, all_cities_docs) {
        if (err) {
            return next(err);
        }
        return res.render('all_cities', {
            title: 'All Currently Created Cities',
            Cities: all_cities_docs,
            user: req.user,
            error: req.flash('There was an error retrieving the list of Cities')
        })
    })
});
router.get('/city/:city_name', isLoggedIn, function (req, res, next) {
    var city_name = req.params.city_name;
    if (city_name.charAt(0) == ':') {
        city_name = city_name.slice(1)
    }
    City.findOne({city_name: city_name}, function (err, this_city_doc) {
        if (err) {
            return next(err);
        }
        NPC.find({current_city: city_name}, function (err, these_npcs_doc) {
            if (err) {
                return next(err)
            }
            Shop.find({location: city_name}, function (err, shops_doc) {
                if (err) {
                    return next(err);
                }
                console.log(city_name + ' is the city_name variable');

                return res.render('city', {
                    title: city_name,
                    City: (this_city_doc),
                    NPCs: (these_npcs_doc),
                    Shops: (shops_doc),
                    user: req.user
                })
            })
        })
    })
});
router.get('/account', isLoggedIn, function (req, res, next) {
    var user_name = req.user.local.username;
    var message=1;
    console.log(req.user.local.username);
    //TODO make an if isAdmin == true, then find and display all non-admin accounts. Then be able to edit their admin privys
    //User.findOne({isAdmin:false}, function (err, these_non_admin_user_docs) {
    //    if (err) {
    //        return next(err)
    //    }
        if (req.user.local.isAdmin==true){
            message=0;
        }
        //PlayerChar.findOne({player: user_name}, function (err, this_PC_doc) {
        //    if (err) {
        //        return next(err)
        //    }
            return res.render('account', {
                title: 'Welcome ' + user_name,
                user: req.user.local,
                //PC: this_PC_doc,
                message:message

            });
        });

//});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/')
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/'); //if anything except a successful authentication occurs, redirect to the root.
}

module.exports = router;

