var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
const mongodbUrl = 'mongodb://transit_db:transit123@ds163613.mlab.com:63613/transit_app_db';

mongoose.connect(mongodbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db connected");
});


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/busStop', express.static('./public/busStop'));

app.use('/route', express.static('./public/route'));

app.use('/bus', express.static('./public/bus'));

app.use('/driver', express.static('./public/driver'));

app.use('/owner', express.static('./public/owner'));

var busstop_routes = require('./routes/busstop_routes');
app.use('/api/busstop', busstop_routes);

var route_routes = require('./routes/route_routes');
app.use('/api/Route', route_routes);

var bus_routes = require('./routes/bus_rotes');
app.use('/api/bus', bus_routes);

var driver_routes = require('./routes/driver_routes');
app.use('/api/driver', driver_routes);

var owner_routes = require('./routes/owner_routes');
app.use('/api/owner', owner_routes);


var port='8080';
app.listen(port);
console.log('Listening on port:'+port );
module.exports = app;
