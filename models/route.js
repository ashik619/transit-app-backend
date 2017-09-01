var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
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
module.exports = mongoose.model('Route', routeSchema,"Routes");
