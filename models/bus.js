var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('debug', true);
var busSchema = new mongoose.Schema({
    name: String,
    cloc: mongoose.Schema.Types.Point,
    routeId : Number,
    status : {type : Number, default : 0 },
    busId: { type: Number, unique: true, required: true },
    ownerId : { type: Number, required: true },
    driverId : Number
});
autoIncrement.initialize(mongoose.connection);
busSchema.plugin(autoIncrement.plugin, {
    model: 'Bus',
    field: 'busId',
    startAt: 1,
    incrementBy: 1
});
busSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Bus', busSchema,"allBus");
//status 0 = not running, 1 = src to dst, 2 = dst to src
