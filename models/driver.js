var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var driverSchema = new mongoose.Schema({
    name: String,
    phoneNumber : { type: String, unique: true, required: true },
    userId : { type: Number, unique: true},
    status : {type : Number, default : 0 }, //0 - inacative 1 - active
    busId: { type: Number, required: false },
    ownerId: { type: Number, required: true },
    password : {type : String, required: true },
    apiKey : {type : String, required: true }
});
driverSchema.plugin(autoIncrement.plugin, {
    model: 'Driver',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});
driverSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Driver', driverSchema,"drivers");
