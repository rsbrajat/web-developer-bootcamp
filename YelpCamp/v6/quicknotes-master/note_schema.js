var mongoose = require('mongoose');
var assert = require('assert');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    username:{
        type: String,
        required:true,
    },
    title:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model('notes', noteSchema);