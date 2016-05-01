/**
 * Created by School on 4/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NPC = require('./npc.js');
var Shop = require('./shop.js');

var citySchema= new Schema({
    city_name:[{type:String, maxLength:40}],
    allegience:[{type:String, default:null}],
    population:{type: Number, maxLength:8, default:0},
    city_guards:{type: Number, default:0},
    city_militia:{type: Number, default:0},
    lat:{type:Number, maxLength: 16, default:0},
    lng:{type:Number, maxLength:16, default:0},
    govtype:{type:String,default:null},
    gov_alignment:{type:String, maxLength:18,default:null},
    gov_npcs:Array,
    city_description:{type:String, maxlength: 1000,default:'Please Enter City Description'},
    shops:{
        general_stores:Array,
        tavern_and_others:Array,
        weps_and_armor:Array,
        magic_shops:Array
    },
    sherrif_or_captain:String,
    casters:Array,
    major_exports:[{type:String}],
    major_imports:[{type:String}]


});
var City = mongoose.model('City',citySchema,'Cities');
module.exports=City;