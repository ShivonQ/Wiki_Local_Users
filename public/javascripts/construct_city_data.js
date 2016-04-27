/**
 * Created by School on 4/19/2016.
 */
function city_constructor(){

    var all_of_them = $(document).find("input.gov_npc");
    var cityname=$("#city_name_box").val();
    var allegiance=$("#allegiance_dropdown option:selected").text();
    var city_pop=$("#city_pop_text_box").val();
    var lat=$("#lat_display").val();
    var lng=$("#lng_display").val();
    var gov_type=$("#gov_type_dropdown option:selected").text();
    var gov_align=$("#alignment_dropdown option:selected").text();
    var city_desc=$("#city_description").val();

    var all_gov_npcs=[];

    $(document).each("input.gov_npcs").val().append(all_gov_npcs);
//            var all_gov_npcs=$(document).find("input.gov_npc");
//                $(forEach(all_gov_npcs)).val();
//            var all_gov_npcs=$("#gov_npc").val();
    var sheriff_or_captain=$("#captain_selector option:selected").text();
    var name_of_s_or_c=$("#guard_captain").val();
    var combo_of_above=sheriff_or_captain+" "+name_of_s_or_c;
//            lists and lists of items
    var spellcasters=$("#caster").val();
    var all_authority_figures={"Governmental":[all_gov_npcs],"Guard Captain":[combo_of_above],"Notable Spellcasters":[spellcasters]}

    var gen_shops=$("#general_store").val();
    var taverns_shops=$("#tavern_or_other").val();
    var magic_item_shops=$("#magic_item_shop").val();
    var weps_and_armor=$("#wep_armor_shop").val();
    var collection_of_stores={"General Stores":[gen_shops],"Weapons & Armor":[weps_and_armor],"Magic Items":[magic_item_shops],"Other Vendors":[taverns_shops]}

    var maj_imp=$("#import").val();
    var maj_exp=$("#export").val();

    var new_city_data=new Settlement_Data(parseInt(city_pop));
    new_city_data.name=cityname;
    new_city_data.country_or_area=allegiance;
    new_city_data.latitude=lat;
    new_city_data.longitude=lng;
    new_city_data.power_center_in_community=gov_type;
    new_city_data.power_center_alignement=gov_align;
    new_city_data.authority_figures=all_authority_figures;
    new_city_data.local_stores=collection_of_stores;
    new_city_data.major_imports=maj_imp;
    new_city_data.major_exports=maj_exp;
    new_city_data.general_description_of_settlement=city_desc;

}
module.exports =city_constructor;