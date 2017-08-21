var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var busStopSchema = require('./models/busStop').schema;
mongoose.set('debug', true);
var routeSchema = new mongoose.Schema({
    name : String,
    src : mongoose.Schema.Types.Point,
    dst : mongoose.Schema.Types.Point,
    busStops = [busStopSchema]
    routeId: { type: Number, unique: true, required: true }
});
routeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Route', routeSchema,"Routes");
