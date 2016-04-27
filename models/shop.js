/**
 * Created by School on 4/19/2016.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var City = require('./city.js');
var NPC = require('./npc.js');

var shop_Schema = new Schema({
    shopName:({type:String, maxLength: 60}),
    owner:[NPC],
    employees:[NPC],
    shop_type:[{type:String}],
    location:[City]
});