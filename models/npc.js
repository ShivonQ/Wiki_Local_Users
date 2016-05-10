/**
 * Created by School on 4/19/2016.
 */
var mongoose=require('mongoose');
var Schema= mongoose.Schema;
//var Shop = require('./shop.js');
var City = require('./city.js');

var npc_Schema=new Schema({
    name:{type:String},
    race:{type:String,default: ''},
    gender:{type:String,default: ''},
    age:{type:Number,default: ''},
    description:{type:Array,default: ''},
    level:{type:Number, default: 1},
    class:{type: String, default: ""},
    owns_a_shop:{type:Boolean, default:false},
    home_city:{type:String},
    current_city:{type:String},
    notes:[{type:String,default: ''}],
    secrets:[{type:String,default: ''}],
    is_sheriff_or_cap:{type: Boolean, default:false}
});
var NPC = mongoose.model('NPC', npc_Schema, 'npcs');
module.exports=NPC;