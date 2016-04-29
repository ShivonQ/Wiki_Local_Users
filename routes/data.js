/**
 * Created by School on 4/27/2016.
 */
var express=require('express');
var router = express.Router();

//Data types needed for making new data
var City=require('../models/city.js');
var NPC = require('../models/npc.js');
var Shop = require('../models/shop.js');
/*
* var citySchema= new Schema({
 city_name:[{type:String, maxLength:40}],
 allegience:[{type:String}],
 population:[{type:Number, maxLength:8}],
 lat:[{type:Number, maxLength: 16}],
 lng:[{type:Number, maxLength:16}],
 govtype:[{type:String}],
 gov_alignment:[{type:String, maxLength:18}],
 gov_npcs:[NPC],
 city_description:[{type:String, minlength: 100}],
 shops:{
 general_stores:[Shop],
 tavern_and_others:[Shop],
 weps_and_armor:[Shop],
 magic_shops:[Shop]
 },
 sherrif_or_captain:[NPC],
 casters:[NPC],
 major_exports:[{type:Array}],
 major_imports:[{type:Array}],
 maps:[{type:Image}

 * */

router.post('/addcity' , function(req,res,next){
    if(!req.body || !req.body.city_name_box){
        return next(new Error('Sorry, somehow you tried to insert data that is invalid, it will not be saved.'))
    }

    var list_of_gov_npcs=[];
    var grab_gov_npcs=function(req){
        var incremental_number=0;
        while(req.gov_npc+incremental_number!=null){
            console.log(req.gov_npc+incremental_number.stringify);
            var newNPC=new NPC({
                name:req.gov_npc+incremental_number,
                home_city:req.city_name
            });
            list_of_gov_npcs.push(newNPC);
            incremental_number++;
            console.log(list_of_gov_npcs);
        }
    };
    grab_gov_npcs(req);
    var newCity=City({
        city_name:req.city_name_box,
        allegience:req.allegiance_dropdown,
        population:req.city_pop,
        city_guards:(req.city_pop*0.01).toFixed(0),
        city_militia:(req.city_pop*0.05).toFixed(0),
        lat:req.lat_display_box,
        lng:lng_display_box,
        govtype:req.gov_type_dropdown,
        gov_alignment:req.alignment_dropdown,
        gov_npcs:list_of_gov_npcs
    })
    console.log(req)
})
module.exports = router;