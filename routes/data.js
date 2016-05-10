/**
 * Created by School on 4/27/2016.
 */
var express = require('express');
var router = express.Router();

//Data types needed for making new data
var City = require('../models/city.js');
var NPC = require('../models/npc.js');
var Shop = require('../models/shop.js');
var PC = require('../models/playerChar.js');
var User = require('../models/user.js');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/'); //if anything except a successful authentication occurs, redirect to the root.
}
router.post('/addcity',isLoggedIn, function (req, res, next) {
    if (!req.body || !req.body.city_name_box) {
        return next(new Error('Sorry, somehow you tried to insert data that is invalid or non-existent, it will not be saved.'))
    }
    var isAdmin=req.user.local.isAdmin;
    if(isAdmin!=true){
        req.flash('You do not have the credentials to add or edit this information. If you feel this message is in error speak with the site Admin.')
    }
    else {
        var list_of_gov_npcs = [];
        var list_of_casters = [];
        var list_of_genShops = [];
        var list_of_tavShops = [];
        var list_of_wepArmorShops = [];
        var list_of_magicShops = [];
        var list_of_exports = [];
        var list_of_imports = [];
        var captn = '';
        var parse_all_dynamic_fields = function (req) {
            obj_req = req.body;
            console.log(obj_req)
            for (var prop in obj_req) {
                var str_prop = String(prop);
                //Check for Government NPCs, sort them and save them
                if (str_prop.indexOf('gov_npc') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {

                        var newNPC = new NPC({
                            name: obj_req[prop],
                            current_city: obj_req.city_name_box
                        });
                        newNPC.save(function (err) {
                            if (err) {
                                return next(err);
                            } else {
                                console.log('One Government NPC saved: ' + newNPC.name)
                            }
                        });
                        list_of_gov_npcs.push(newNPC.name);
                    }
                }

                //Check for caster NPCs, sort them and save them
                if (str_prop.indexOf('caster') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var newCasterNPC = new NPC({
                            name: obj_req[prop],
                            current_city: obj_req.city_name_box
                        });
                        newCasterNPC.save(function (err) {
                            if (err) {
                                return next(err)
                            } else {
                                console.log('One Caster NPC has been saved: ' + newCasterNPC.name)
                            }
                        });
                        list_of_casters.push(newCasterNPC.name);
                    }
                }
                if (str_prop.indexOf('gen_store') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var newGenShop = new Shop({
                            shopName: obj_req[prop],
                            location: obj_req.city_name_box,
                            shop_type: 'gen_store'
                        });
                        newGenShop.save(function (err) {
                            if (err) {
                                return next(err);
                            } else {
                                console.log('One General Shop Saved: ' + newGenShop.shopName)
                            }
                        });
                        list_of_genShops.push(newGenShop.shopName);
                    }
                }
                if (str_prop.indexOf('tavern_or_other') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        if (obj)
                            var newTavShop = new Shop({
                                shopName: obj_req[prop],
                                location: obj_req.city_name_box,
                                shop_type: 'tavern_or_other'
                            });
                        newTavShop.save(function (err) {
                            if (err) {
                                return next(err);
                            } else {
                                console.log('One Tavern or similar shop has been saved: ' + newTavShop.shopName)
                            }
                        });
                        list_of_tavShops.push(newTavShop.shopName);
                    }
                }
                if (str_prop.indexOf('wep_armor_shop') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var newWepArmorShop = new Shop({
                            shopName: obj_req[prop],
                            location: obj_req.city_name_box,
                            shop_type: 'wep_armor_shop'
                        });
                        newWepArmorShop.save(function (err) {
                            if (err) {
                                return next(err)
                            } else {
                                console.log('One Weapon or Armory has been saved: ' + newWepArmorShop.shopName)
                            }
                        });
                        list_of_wepArmorShops.push(newWepArmorShop.shopName);
                    }
                }
                if (str_prop.indexOf('magic_item_shop') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var newMagicShop = new Shop({
                            shopName: obj_req[prop],
                            location: obj_req.city_name_box,
                            shop_type: 'magic_item_shop'
                        });
                        newMagicShop.save(function (err) {
                            if (err) {
                                return next(err)
                            } else {
                                console.log('One Magic Item Shop has been saved: ' + newMagicShop.shopName)
                            }
                        });
                        list_of_magicShops.push(newMagicShop.shopName);
                    }
                }
                if (str_prop.indexOf('export') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var export_type = obj_req[prop];
                        list_of_exports.push(export_type);
                        console.log(export_type)
                    }
                }
                if (str_prop.indexOf('import') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var import_type = obj_req[prop];
                        list_of_imports.push(import_type);
                        console.log(import_type)
                    }
                }
                if (str_prop.indexOf('guard_leader') >= 0) {
                    if (obj_req[prop] == '') {
                        console.log('Empty field skipped')
                    } else if (obj_req != '') {
                        var captain_or_sher = new NPC({
                            name: obj_req[prop],
                            current_city: obj_req.city_name_box,
                            is_sheriff_or_cap: true
                        });
                        captain_or_sher.save(function (err) {
                            if (err) {
                                return next(err)
                            } else {
                                console.log('The Sheriff or captain has been saved:  ' + captain_or_sher.name)
                            }

                        });
                    }
                    console.log("recieved data name: " + prop + " , associated data in it: " + obj_req[prop]);
                }
            }
//CALL IT!
            parse_all_dynamic_fields(req);
            var newCity = new City({
                city_name: req.body.city_name_box,
                allegience: req.body.allegiance_dropdown,
                population: req.body.city_pop,
                city_guards: (req.body.city_pop * 0.01).toFixed(0),
                city_militia: (req.body.city_pop * 0.05).toFixed(0),
                lat: req.body.lat_display_box,
                lng: req.body.lng_display_box,
                govtype: req.body.gov_type_dropdown,
                gov_alignment: req.body.alignment_dropdown,
                gov_npcs: list_of_gov_npcs,
                city_description: req.body.city_description_field,
                shops: {
                    general_stores: list_of_genShops,
                    tavern_and_others: list_of_tavShops,
                    weps_and_armor: list_of_wepArmorShops,
                    magic_shops: list_of_magicShops
                },
                sherrif_or_captain: captn,
                casters: list_of_casters,
                major_exports: list_of_exports,
                major_imports: list_of_imports
            });
//SAVE IT!!!!!!
            newCity.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    //redirect it!!!!
                    res.redirect('/map')
                }
            });
            console.log(newCity)
        }
    }
});

router.post('/addNPC',isLoggedIn, function (req, res, next) {
    if (!req.body || !req.body.npc_name_field) {
        return next(new Error('Sorry, somehow you tried to insert data that is invalid or non-existent, it will not be saved.'))
    }
    var isAdmin=req.user.local.isAdmin;
    if(isAdmin!=true){
        req.flash('You do not have the credentials to add or edit this information. If you feel this message is in error speak with the site Admin.')
    }
    else {
        var obj_req = req.body;
        console.log(JSON.stringify(obj_req) + "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        var newNPC = new NPC({
            name: obj_req.npc_name_field,
            race: obj_req.npc_race_field,
            gender: obj_req.gender_dropdown,
            age: obj_req.age_field,
            description: obj_req.description_field,
            level: obj_req.level_field,
            class: obj_req.class_selector,
            owns_a_shop: obj_req.owns_shop,
            home_city: obj_req.home_city_dropdown,
            current_city: obj_req.current_city_dropdown,
            notes: obj_req.npc_notes,
            secrets: obj_req.npc_secrets,
            is_sheriff_or_cap: obj_req.is_sheriff
        });
        console.log("*****************************" + newNPC + "*************************");
        newNPC.save(function (err) {
            if (err) {
                return next(err);
            } else {
                //redirect it!!!!
                res.redirect('/npcs')
            }
        });
    }
});
router.post('/addPC',isLoggedIn, function(req,res,next){
    console.log(req.body);
    var num_chars=req.user.local.number_of_characters;
    if(!req.body || !req.body.char_name){
        return next(new Error('Sorry, somehow you tried to insert data that is invalid or non-existent, it will not be saved.'))
    }
    if (req.user.local.number_of_characters>0){
        console.log(req.user.local.number_of_characters+'\nfirst user conlog')
        req.flash('You already have 1 Character, the ability to have more than one will be coming in a later version.')
    }
    else if(num_chars==0 && req.user.local.isAdmin==false){
        var newPC= new PC({
            player:req.user.local.username,
            character_name:req.body.char_name,
            age:req.body.char_age,
            race:req.body.char_race,
            base_class:{
                the_class:req.body.char_base_class,
                level:req.body.level_field
            }
        });
        console.log('second conlog\n'+newPC);
        newPC.save(function(err){
            if(err){
                return next(err);
            }
            num_chars++;
            res.redirect('/all_PCs')
        })
        User.findOneAndUpdate({number_of_characters:num_chars},function(err,result){
            console.log('user updated on PC save');
            if(err){
                return next(err)
            }
        })
    }
    else if(req.user.local.isAdmin==true){
         newPC= new PC({
            player:req.user.local.username,
            character_name:req.body.char_name,
            age:req.body.char_age,
            race:req.body.char_race,
            base_class:{
                the_class:req.body.char_base_class,
                level:req.body.level_field
            }
        });
        newPC.save(function(err){
            if(err){
                return next(err);
            }else{
                num_chars++;
                res.redirect('/all_PCs')
            }
        });
        User.findOneAndUpdate({number_of_characters:num_chars},function(err,result){
            console.log('user updated on PC save');
            if(err){
                return next(err)
            }
        })
    }
});

router.param('npc_id',function(req,res,next,npcId){
  console.log('parameter has been removed, it is '+npcId);
    NPC.findById(npcId, function(err, npc){
        if(err){
            return next(err);
        }
        req.npc=npc;
        req.npc=npc
        return next();
    })
});

router.delete('/delete/:npc_id',isLoggedIn, function (req, res, next) {
    isAdmin=req.user.local.isAdmin;
    if(isAdmin!=true){
        req.flash('You do not have proper credentials to edit this information, if you feel this message is in error contact the site admin.')
    }else{


    NPC.findByIdAndRemove(req.npc._id, function (error, result) {
        console.log(req.npc._id);
        if (error) {
            console.log('THIS eRrOR MESSAGE IS COMING FROM THE ROUTER')
            return next(500);
        }
        console.log('THIS MESSAGE IS COMING FROM THE ROUTER')
        res.sendStatus(200)
    })
    }
});
router.put('/update_pc_age', function(req,res){

    var filter = {character_name:req.body.character_name};
    var update={$set:req.body};
    PC.findOneAndUpdate(filter,{'age':req.body.age},function(err,result){
        if(err){
            console.log("error while updateing the age of the PC:"+err);
            return res.sendStatus(500);
        } else {
            console.log('update PC age -:'+result);
            return res.send({'age':req.body.age})
        }
    })
});
router.put('/update_pc_race',function(req,res){
    var filter={character_name:req.body.character_name};
    var update={$set:req.body};
    PC.findOneAndUpdate(filter,{'race':req.body.race},function(err,result) {
        if (err) {
            console.log("error while updating the race of the PC:" + err);
            return res.sendStatus(500);
        } else {
            console.log('updated PC race' + result);
            return res.send({'race': req.body.race})
        }
    })
});

router.put('/update_pc_class',function(req,res){
    var filter= {'base_class._id':req.body._id};
    var update={$set:req.body};
console.log(req.body)
    PC.findOneAndUpdate(filter,{'the_class':req.body.the_class},function(err,result) {
        if (err) {
            console.log("error while updateing the class of the PC:" + err);
            return res.sendStatus(500);
        } else {
            console.log('updated PC class' + result);
            return res.send({'the_class': req.body.class})
        }
    })
});
router.put('/update_pc_level',function(req,res){
    var filter={character_name:req.body.character_name};
    console.log(filter)
    var update={$set:req.body};
    console.log(update)
    PC.findOneAndUpdate(filter,{'level':req.body.level},function(err,result) {
        if (err) {
            console.log("error while updateing the level of the PC:" + err);
            return res.sendStatus(500);
        } else {
            console.log('updated PC class' + result);
            return res.send({'level': req.body.level})
        }
    })
});
module.exports = router;