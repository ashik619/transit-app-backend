var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
mongoose.set('debug', true);
var busStopSchema = new mongoose.Schema({
name: String,
loc: mongoose.Schema.Types.Point,
stopId: String,
});
//TodoSchema.set('collection', 'todos')
module.exports = mongoose.model('User', UserSchema,"userarray");
