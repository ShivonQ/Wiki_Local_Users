/**
 * Created by School on 4/20/2016.
 */

$(document).ready(function () {
    $("#large_legend").on("click", function () {
        $(this).parent().find('.admin_wrapper').slideToggle("med");
    });

    $("#add_spellcaster_button").on("click", function () {
        var all_casters = $("<div class=\"all_casters\" class=\"casters\"/>");
        var caster_text_field = $("<input type=\"text\" class=\"caster\"/>");
        var remove_caster_button = $("<button  class=\"remove_caster_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        var select_caster_type = $("<select class='arc_or_div'><option value='none'></option><option value='Arcane'>Arcane</option><option value='Divine'>Divine</option>")
        remove_caster_button.click(function () {
            $(this).parent().remove();
        });
        all_casters.append(select_caster_type);
        all_casters.append(caster_text_field);
        all_casters.append(remove_caster_button);
        $("#spellcasters_div").append(all_casters);
    });
    $("#add_import_button").on("click", function () {
        var all_imports = $("<div class=\"all_imports\" class=\"imports\"/>");
        var import_text_field = $("<input type=\"text\" class=\"import\"/>");
        var remove_import_button = $("<button  class=\"remove_import_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_import_button.click(function () {
            $(this).parent().remove();
        });
        all_imports.append(import_text_field);
        all_imports.append(remove_import_button);
        $("#major_imports_div").append(all_imports);
    });
    $("#add_export_button").on("click", function () {
        var all_exports = $("<div class=\"all_exports\" class=\"exports\"/>");
        var export_text_field = $("<input type=\"text\" class=\"export\"/>");
        var remove_export_button = $("<button  class=\"remove_export_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_export_button.click(function () {
            $(this).parent().remove();
        });
        all_exports.append(export_text_field);
        all_exports.append(remove_export_button);
        $("#major_exports_div").append(all_exports);
    });
    $("#add_gov_npc_button").on("click", function () {
        var all_gov_npcs = $("<div class=\"all_gov_npcs\" class=\"gov_npcs\"/>");
        var npc_text_field = $("<input type=\"text\" class=\"gov_npc\"/>");
        var remove_gov_button = $("<button  class=\"remove_gov_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_gov_button.click(function () {
            $(this).parent().remove();
        });
        all_gov_npcs.append(npc_text_field);
        all_gov_npcs.append(remove_gov_button);
        $("#gov_npcs_div").append(all_gov_npcs);
    });
    $("#add_general_store_button").on("click", function () {
        var all_general_stores = $("<div class=\"all_general_stores\" class=\"general_stores\"/>");
        var store_text_field = $("<input type=\"text\" class=\"general_store\"/>");
        var remove_gen_store_button = $("<button  class=\"remove_gen_store_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_gen_store_button.click(function () {
            $(this).parent().remove();
        });
        all_general_stores.append(store_text_field);
        all_general_stores.append(remove_gen_store_button);
        $("#general_stores_div").append(all_general_stores);
    });
    $("#add_tavern_button").on("click", function () {
        var all_taverns_and_otheras = $("<div class=\"all_taverns_and_others\" class=\"taverns_and_others\"/>");
        var store_text_field = $("<input type=\"text\" class=\"tavern_or_other\"/>");
        var remove_tavern_button = $("<button  class=\"remove_tavern_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_tavern_button.click(function () {
            $(this).parent().remove();
        });
        all_taverns_and_otheras.append(store_text_field);
        all_taverns_and_otheras.append(remove_tavern_button);
        $("#taverns_div").append(all_taverns_and_otheras);
    });
    $("#add_weps_and_armor_button").on("click", function () {
        var all_weps_and_armor = $("<div class=\"all_weps_and_armor\" class=\"weps_and_armor\"/>");
        var store_text_field = $("<input type=\"text\" class=\"wep_armor_shop\"/>");
        var remove_weps_button = $("<button  class=\"remove_weps_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_weps_button.click(function () {
            $(this).parent().remove();
        });
        all_weps_and_armor.append(store_text_field);
        all_weps_and_armor.append(remove_weps_button);
        $("#weps_and_armor_div").append(all_weps_and_armor);
    });
    $("#add_magic_store_button").on("click", function () {
        var all_magic = $("<div class=\"all_magic_items\" class=\"magic_items\"/>");
        var store_text_field = $("<input type=\"text\" class=\"magic_item_shop\"/>");
        var remove_magic_button = $("<button  class=\"remove_magic_button\"><span class=\"glyphicon glyphicon-minus\"></span></button>");
        remove_magic_button.click(function () {
            $(this).parent().remove();
        });
        all_magic.append(store_text_field);
        all_magic.append(remove_magic_button);
        $("#magic_shops_div").append(all_magic);
    });
});