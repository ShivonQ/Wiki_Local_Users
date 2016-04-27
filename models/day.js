/**
 * Created by School on 4/26/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Month = require('./month.js');

var day_schema = new Schema({
    month:Month,
    date:({type:Number}),
    //This is where data on events occurring that day are stored
    events:({type: Array}),
    lunar_phase:({type:Image}),
    year:({type:Number}),
    age:({type:Number})
});