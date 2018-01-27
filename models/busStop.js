var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var busStopSchema = new mongoose.Schema({
    name: String,
    loc: mongoose.Schema.Types.Point,
    stopId: { type: Number, unique: true, required: true }
});
autoIncrement.initialize(mongoose.connection);
busStopSchema.plugin(autoIncrement.plugin, {
    model: 'BusStop',
    field: 'stopId',
    startAt: 1,
    incrementBy: 1
});
busStopSchema.plugin(uniqueValidator);
module.exports = mongoose.model('BusStop', busStopSchema,"BusStops");
