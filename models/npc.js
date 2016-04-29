/**
 * Created by School on 4/19/2016.
 */
var mongoose=require('mongoose');
var Schema= mongoose.Schema;
//var Shop = require('./shop.js');
var City = require('./city.js');

var npc_Schema=new Schema({
    name:{type:String},
    race:{type:String,default: null},
    gender:{type:String,default: null},
    age:{type:Number,default: null},
    description:{type:Array,default: null},
    //owns_shop:{
    //    owns_a_shop:{type:Boolean, default: false},
    //    shop:{type:Shop,default: null}
    //},
    home_city:{type:String},
    notes:[{type:String,default: null}],
    secrets:[{type:String,default: null}]
});
var NPC = mongoose.model('NPC', npc_Schema, 'npcs');
module.exports=NPC;