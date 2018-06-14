var mongoose = require('mongoose');
var assert = require('assert');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model('users', userSchema);