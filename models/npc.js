/**
 * Created by School on 4/19/2016.
 */
var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var Shop = require('./shop.js');
var City = require('./city.js');

var npc_Schema=new Schema({
    name:[{type:String}],
    race:[{type:String}],
    gender:[{type:String}],
    age:[{type:Number}],
    description:[{type:Array}],
    owns_shop:{
        owns_a_shop:[{type:Boolean, default: false}],
        shop:[Shop]
    },
    home_city:[City],
    notes:[],
    secrets:[]
});