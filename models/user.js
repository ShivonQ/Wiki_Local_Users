/**
 * Created by School on 4/20/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var PlayerChar = require('./playerChar.js');

var userSchema = mongoose.Schema({

    google:{
        id:String,
        token: String,
        name:String,
        email:String
    },

    isAdmin:[{type:Boolean, default:false}],
    dm_privileges:{
        is_DM:[{type: Boolean, default:false}],
        campaign:[{type:String}]
    },
    isPlayer:[{type:Boolean, default: true}],
    characters:[PlayerChar]
})