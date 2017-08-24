var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Route = require('../models/route.js');
var BusStop = require('../models/busStop.js');

router.get('/',function(req,res){
res.send('It works');
});

router.post('/createRoute', function(req, res) {
	var temp = new Route();
	temp.name = req.body.name;
	temp.routeId = req.body.routeId;
	temp.src = {type: "Point",coordinates:[req.body.slng,req.body.slat]};
    temp.dst = {type: "Point",coordinates:[req.body.dlng,req.body.dlat]};
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: 200 });	
		}
	});
});

router.post('/addBustop', function(req, res) {
	Route.findOne({routeId : req.body.id},function(err,route){
        if(err){
            console.log(err);
        }else {
            console.log(route)
        }
    });
});

router.get('/getRoutes', function(req, res) {
	console.log('api hit');
	Route.find(function(err, routes) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			res.json({ success: true , data: routes });
		}
	});
});
	
module.exports = router;
