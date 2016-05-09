/**
 * Created by School on 4/20/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var PlayerChar = require('./playerChar.js');

var userSchema = mongoose.Schema({

    local: {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
        number_of_characters:{type:Number, default:0}
    },
});
userSchema.methods.generateHash= function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
};
userSchema.methods.validPassword=function(password){
    return bcrypt.hashSync(password, this. local.password);
};
module.exports=mongoose.model('User', userSchema);