var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('debug', true);
var busStopSchema = new mongoose.Schema({
    name: String,
    loc: mongoose.Schema.Types.Point,
    stopId: { type: Number, unique: true, required: true }
});
busStopSchema.plugin(uniqueValidator);
module.exports = mongoose.model('BusStop', UserSchema,"BusStops");
