var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017');
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

var busstop_routes = require('./routes/busstop_routes');
app.use('/api/busstop', busstop_routes);

var route_routes = require('./routes/route_routes');
app.use('/api/Route', route_routes);


var port='8080';
app.listen(port);
console.log('Listening on port:'+port );
module.exports = app;
