/**
 * Created by School on 4/26/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Day = require('./day.js');

var month_schema=new Schema({
    start_day:[{type:String}],
    number_of_days:({type:Number}),
    holidays:({type:Number}),
    all_days:[Day]

})