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
	temp.srcBsId = req.body.srcBsId;
	temp.srcName = req.body.srcName;
	temp.dstName = req.body.dstName;
    temp.dstBsId = req.body.dstBsId;
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: "Route Created" });	
		}
	});
});

router.post('/addBustop', function(req, res) {
	Route.findOne({routeId : req.body.id},function(err,route){
        if(err){
			res.json({ success: false , msg: 404 });
        }else {
            console.log(route);
			if(route.busStops.indexOf(req.body.bsId) > -1){
				res.json({ success: false , msg: 422 });
			}else{
				Route.update(
				{ _id: route._id }, 
				{ $push: { busStops: req.body.bsId } },
				function(err,raw){
					if(err){
						res.json({ success: false , msg: 500 });
					}else res.json({ success: true , msg: 200 });
				}
				);
			}
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

router.get('/getRouteBusStops', function(req, res) {
	Route.findOne({routeId : req.query.id},'busStops',function(err,route){
			if(err){
				res.json({ success: false , msg: 404 });
			}else {
				if(route){
					BusStop.find({stopId : {$in : route.busStops}},
								 function(err,busStops){
									if(err){
									res.json({ success: false , msg: 500 });
									}else res.json({ success: true , data : busStops });
								 
								 });
				}else res.json({ success: false , msg: 500 });
			}
		});
});
	
module.exports = router;
