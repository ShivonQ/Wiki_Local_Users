/**
 * Created by School on 4/27/2016.
 */
var LocalStrategy = require('passport-local').Strategy;
var User =require('../models/user');

module.exports=function(passport){

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err, user){
            done(err,user);
        } )
    });
    passport.use('local-signup',new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },function(req,username,password,done){
        process.nextTick(function(){
            User.findOne({'local.username':username},function(err,user){
                if(err){
                    return done(err);
                }
                if(user){
                    console.log('user with that name already exists');
                    return done(null, false, req.flash('signupMessage', 'Sorry, username already taken.'));
                }
                var newUser=new User();
                newUser.realName = req.body.realName;
                newUser.local.username=username;
                newUser.local.password=newUser.generateHash(password);
                newUser.tasks=[]  //must be empty, since they are a new user. add em in later.
                //did it get constructed correctly?!!?!?!?!?
                console.log('***************First Print***********\n'+JSON.stringify(newUser)+"\n***************First Print**************")
                newUser.save(function(err){
                    if(err){
                        throw err;
                    }
                    console.log('**************Second Print*******\n'+JSON.stringify(newUser)+"\n***************Second Print**********")

                    return done(null,newUser)
                })
            })
        })
    }));
    passport.use('local-login', new LocalStrategy({
            usernameField:'username',
            passwordField:'password',
            passReqToCallback:true
        },
        function(req,username,password,done){
            process.nextTick(function(){
                User.findOne({'local.username':username}, function(err,user){
                    if(err){
                        return done(err);
                    }
                    if(!user){
                        return done(null,false, req.flash('loginMessage', 'User Not Found'))
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'The username or password not match.'))
                    }
                    return done(null, user);
                })
            })
        }))
};//Last point of callback.
