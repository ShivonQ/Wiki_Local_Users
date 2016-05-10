/**
 * Created by School on 4/20/2016.
 */
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var NPC = require('./npc.js');
var User = require('./user.js');

var playerChar_Schema=new Schema({
    player:{type:String, required:true},
    character_name:{type: String, required:true, unique:true},
    age:{type:Number, default:''},
    race:{type:String,default:''},
    base_class:[{
        the_class:{type:String, default: ''},
        level:{type:Number, max:20, default:1}
    }],
    prestige_class:[{
        pres_class:{type:String, default:''},
        pres_levels:{type:Number, max:20,default:0}
    }],
    alignment:{type:String, default:''},
    religion:{type:String, default:''},
    home_country:{type:String,default:''},
    reputation_Score:{type:Number,default:0},
    owns_a_shop:{type:Boolean, default:false},
    family_members:[{
        father:{type:String,default:''},
        mother:{type:String,default:''},
        siblings:[{type:String, default:''}],
        extended:[{type:String, default:''}]
    }],
    childhood:[{type:String, max:400, default:null}],
    event_that_spurred_adventure:[{type:String, max:400,default:null}],
    goals:[{type:String, max:400,default:null}],
    general_notes:[{type:String, max: 400, default:null}],
    diary:[{type:String,max:400, default:null}]
})
//var NPC = mongoose.model('NPC', npc_Schema, 'npcs');
var PlayerChar=mongoose.model('PlayerChar',playerChar_Schema,'player_chars');
module.exports=PlayerChar;