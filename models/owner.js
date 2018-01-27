var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var ownerSchema = new mongoose.Schema({
    name: String,
    phoneNumber : { type: String, unique: true, required: true },
    ownerId : { type: Number, unique: true, required: true },
    busIds:  [Number],
    password : {type : String, required: true },
    apiKey : {type : String, required: true }
});
ownerSchema.plugin(uniqueValidator);
autoIncrement.initialize(mongoose.connection);
ownerSchema.plugin(autoIncrement.plugin, {
    model: 'Owner',
    field: 'ownerId',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('Owner', ownerSchema,"owners");
