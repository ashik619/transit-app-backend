var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('debug', true);
var routeSchema = new mongoose.Schema({
    name : String,
    src : mongoose.Schema.Types.Point,
    dst : mongoose.Schema.Types.Point,
    busStops : [Number],
    routeId: { type: Number, unique: true, required: true }
});
routeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Route', routeSchema,"Routes");
