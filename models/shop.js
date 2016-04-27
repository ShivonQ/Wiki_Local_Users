/**
 * Created by School on 4/19/2016.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var City = require('./city.js');
var NPC = require('./npc.js');

var shop_Schema = new Schema({
    shopName:({type:String, maxLength: 60}),
    owner:[{type:NPC, default: null}],
    employees:[{type:NPC, default: null}],
    shop_type:[{type:String, default: null}],
    location:[{type:City, default: null}]
});
var Shop = mongoose.model('Shop',shop_Schema,'Shops');
module.exports=Shop;