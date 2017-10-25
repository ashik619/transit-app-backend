var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
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
busSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Bus', busSchema,"allBus");
