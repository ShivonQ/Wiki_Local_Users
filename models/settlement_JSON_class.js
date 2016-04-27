/**
 * Created by School on 4/27/2016.
 */
var Settlement_Data=function(pop){
    this.name="";
    this.country_or_area="";

    this.population=pop;
    this.money_limit=0;

    this.power_center_in_community="";
    this.power_center_alignement="";
    this.authority_figures={"Governmental":[],"Guard Captain":[],"Notable Spellcasters":[]};

    this.city_guards=(this.population*0.01).toFixed(0);
    this.city_militia=(this.population*0.05).toFixed(0);
    this.major_exports=[];
    this.major_imports=[];
    this.local_stores={"General Stores":[],"Weapons & Armor":[],"Magic Items":[],"Other Vendors":[]};
    this.knowledge_local_information={10:"",15:"",20:"",25:"","30":""};
    this.general_description_of_settlement="";

    this.city_map=null;
    this.local_map=null;
    //TODO once the map is working properly find the coordinates for the towns.
    this.latitude=0;
    this.longitude=0;
};