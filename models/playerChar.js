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
    age:{type:Number, default:null},
    race:{type:String,default:null},
    base_class:[{
        the_class:{type:String, default: null},
        level:{type:Number, max:20, default:null}
    }],
    prestige_class:[{
        pres_class:{type:String, default:null},
        pres_levels:{type:Number, max:20,default:null}
    }],
    alignment:{type:String, default:null},
    religion:{type:String, default:null},
    home_country:{type:String,default:null},
    reputation_Score:{type:Number,default:null},
    owns_a_shop:{type:Boolean, default:false},
    family_members:[{
        father:{type:String,default:null},
        mother:{type:String,default:null},
        siblings:[{type:String, default:null}],
        extended:[{type:String, default:null}]
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