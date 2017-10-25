var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var ownerSchema = new mongoose.Schema({
    name: String,
    phoneNumber : { type: String, unique: true, required: true },
    ownerId : { type: Number, unique: true, required: true },
    busIds:  [Number]
});
ownerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Owner', ownerSchema,"owners");
