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
        return next(new Error('Sorry, somehow you tried to insert data that is invalid or non-existent, it will not be saved.'))
    }
    var list_of_gov_npcs=[];
    var list_of_casters=[];
    var list_of_genShops=[];
    var list_of_tavShops=[];
    var list_of_wepArmorShops=[];
    var list_of_magicShops=[];
    var list_of_exports=[];
    var list_of_imports=[];
    var captn='';
    var parse_all_dynamic_fields=function(req){
        obj_req=req.body;
        for(var prop in obj_req){
            var str_prop=String(prop);
            //Check for Government NPCs, sort them and save them
            if(str_prop.indexOf('gov_npc')>=0){
                var newNPC = new NPC({
                    name:obj_req[prop],
                    current_city:obj_req.city_name_box
                });
                newNPC.save(function(err){
                    if(err){
                        return next(err);
                    } else {console.log('One Government NPC saved: '+newNPC.name)}
                });
                list_of_gov_npcs.push(newNPC.name);
            }
            //Check for caster NPCs, sort them and save them
            if(str_prop.indexOf('caster')>=0){
                var newCasterNPC=new NPC({
                    name:obj_req[prop],
                    current_city:obj_req.city_name_box
                });
                newCasterNPC.save(function(err){
                    if(err){
                        return next(err)
                    } else {console.log('One Caster NPC has been saved: '+newCasterNPC.name)}});
                list_of_casters.push(newCasterNPC.name);
            }
            if(str_prop.indexOf('gen_store')>=0){
                var newGenShop = new Shop({
                    shopName:obj_req[prop],
                    location:obj_req.city_name_box
                });
                newGenShop.save(function(err){
                    if(err){
                        return next(err);
                    } else {console.log('One General Shop Saved: '+newGenShop.shopName)}});
                list_of_genShops.push(newGenShop.shopName);
            }
            if(str_prop.indexOf('tavern_or_other')>=0){
                var newTavShop = new Shop({
                    shopName:obj_req[prop],
                    location:obj_req.city_name_box
                });
                newTavShop.save(function(err){
                    if(err){
                        return next(err);
                    } else {console.log('One Tavern or similar shop has been saved: '+newTavShop.shopName)}});
                list_of_tavShops.push(newTavShop.shopName);
            }
            if(str_prop.indexOf('wep_armor_shop')>=0){
                var newWepArmorShop = new Shop({
                    shopName:obj_req[prop],
                    location:obj_req.city_name_box
                });
                newWepArmorShop.save(function(err){
                    if(err){
                        return next(err)
                    } else {console.log('One Weapon or Armory has been saved: '+newWepArmorShop.shopName)}});
                list_of_wepArmorShops.push(newWepArmorShop.shopName);
            }
            if(str_prop.indexOf('magic_item_shop')>=0){
                var newMagicShop = new Shop({
                    shopName:obj_req[prop],
                    location:obj_req.city_name_box
                });
                newMagicShop.save(function(err){
                    if(err){
                        return next(err)
                    } else {console.log('One Magic Item Shop has been saved: '+newMagicShop.shopName)}});
                list_of_magicShops.push(newMagicShop.shopName);
            }
            if(str_prop.indexOf('export')>=0){
                var export_type=obj_req[prop];
                list_of_exports.push(export_type);
                console.log(export_type)
            }
            if(str_prop.indexOf('import')>=0){
                var import_type=obj_req[prop];
                list_of_imports.push(import_type);
                console.log(import_type)
            }
            if(str_prop.indexOf('guard_leader')>=0){
                var captain_or_sher=new NPC({
                    name:obj_req[prop],
                    current_city:obj_req.city_name_box,
                    is_sheriff_or_cap:true
                });
                captn=captain_or_sher.name;
                console.log(captn)
            }
            console.log("recieved data name: "+prop+" , associated data in it: "+obj_req[prop]);
        }
    };
    //CALL IT!
    parse_all_dynamic_fields(req);
    //MAKE IT!!!!!

    //console.log(list_of_gov_npcs+"\n"+
    //    list_of_casters+"\n"+
    //    list_of_genShops+"\n"+
    //    list_of_tavShops+"\n"+
    //    list_of_wepArmorShops+"\n"+
    //    list_of_magicShops+"\n"+
    //    list_of_exports+"\n"+
    //    list_of_imports);

    var newCity= new City({
        city_name:req.body.city_name_box,
        allegience:req.body.allegiance_dropdown,
        population:req.body.city_pop,
        city_guards:(req.body.city_pop*0.01).toFixed(0),
        city_militia:(req.body.city_pop*0.05).toFixed(0),
        lat:req.body.lat_display_box,
        lng:req.body.lng_display_box,
        govtype:req.body.gov_type_dropdown,
        gov_alignment:req.body.alignment_dropdown,
        gov_npcs:list_of_gov_npcs,
        city_description:req.body.city_description_field,
        shops:{
            general_stores:list_of_genShops,
            tavern_and_other:list_of_tavShops,
            weps_and_armor:list_of_wepArmorShops,
            magic_shops:list_of_magicShops
        },
        sherrif_or_captain:captn,
        casters:list_of_casters,
        major_exports:list_of_exports,
        major_imports:list_of_imports
    });
    //SAVE IT!!!!!!
    newCity.save(function(err){
        if(err){
            return next(err);
        } else {
            //redirect it!!!!
            res.redirect('/map')
        }
    });
    console.log(newCity)
});


module.exports = router;