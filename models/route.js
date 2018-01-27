var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var routeSchema = new mongoose.Schema({
    name : String,
    srcBsId : Number,
    dstBsId : Number,
    srcName : String,
    dstName : String,
    busStops : [Number],
    routeId: { type: Number, unique: true, required: true }
});
routeSchema.plugin(uniqueValidator);
autoIncrement.initialize(mongoose.connection);
routeSchema.plugin(autoIncrement.plugin, {
    model: 'Route',
    field: 'routeId',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('Route', routeSchema,"Routes");
