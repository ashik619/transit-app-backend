var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Bus = require('../models/bus.js');
var BusStop = require('../models/busStop.js');
var Route = require('../models/route.js');
var async = require("async");


router.post('/createBus', function(req, res) {
	var temp = new Bus();
	temp.name = req.body.name;
  temp.routeId = req.body.routeId;
	temp.ownerId = req.body.ownerId;
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: "Bus Added" });
		}
	});
});

router.get('/getAllBus', function(req, res) {
	Bus.find(function(err, allBus) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			res.json({ success: true , data: allBus });
		}
	});
});
router.get('/getBusDetails', function(req, res) {
	Bus.find({busId : req.query.bId},function(err, allBus) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			var reqBus = allBus[0];
			Route.find({routeId: reqBus.routeId},function(err,routes){
				res.json({ success: true , data: {bus : reqBus,route : routes[0] } });
			});
		}
	});
});



router.post('/updateCurrentLoc', function(req, res) {
    Bus.findOneAndUpdate({busId : req.body.id},{$set: { cloc: { type: "Point", coordinates: [ req.body.lng, req.body.lat ] }  }},{new: true},function(err,bus){
			if(err){
				res.json({ success: false , msg: 404 });
			}else {
				if(bus){
					res.json({ success: true , msg: 200 });
				}else res.json({ success: false , msg: 404 });
			}
		});

});

function findNearBusStop(lat,lng,callback){
	BusStop.find(
		{
			loc : {
				$near:{
					 $geometry: { type: "Point",  coordinates: [ lng, lat ] }
				}
			}
		},function(err,busStop){
			if(err){
				callback(err,null);
			}else{
				if(busStop){
					callback(null,busStop[0]);
				}else{
					callback("no bus found",null);
				}
			}
		}
	);
}

router.post('/findMyBus', function(req, res) {
	var srcBusStop;
	var dstBusStop;
	async.waterfall([
		function(callback){
			async.parallel([
				function(callback){
					findNearBusStop(req.body.sLat,req.body.slng,function(err,result){
						callback(err,result);
					});
				},
				function(callback){
					findNearBusStop(req.body.dLat,req.body.dlng,function(err,result){
						callback(err,result);
					});
				},
				],function(err, results) {
							if (err !== null) {
								callback(true,"err");
							}else{
								console.log(results);
								callback(null,results);
							}
				  }
			);
		},
		function(results,callback){
			srcBusStop =  results[0];
			dstBusStop =  results[1];
			Route.find({ 'busStops' : { $all : [srcBusStop.stopId , dstBusStop.stopId ]}}
					   ,function(err, routes){
					if(err){
						callback(err,null);
					}else{
						if(routes.length > 0){
							callback(null,routes);
						}
					}
				}
			);

		},
		function(routes,callback){
			var finalroutes = [];
			for (var i = 0; i < routes.length; i++) {
				var route = routes[i];
				if(route.busStops.indexOf(srcBusStop.stopId)<route.busStops.indexOf(dstBusStop.stopId)){
					finalroutes.push({routeId : route.routeId, status : 1});
				}else {
					finalroutes.push({routeId : route.routeId, status : 2});
				}
			}
			callback(null,finalroutes);
		},
		function(finalroutes,callback){
			var finalBuses = [];
			console.log(finalroutes);
			for (var i = 0; i < finalroutes.length; i++) {
				Bus.find(
					finalroutes[i],
					function(err,buses){
						console.log(buses);

						if(buses.length>0){
							finalBuses.push(buses);
						}
						console.log(finalBuses);
						console.log('i :'+i);
						if(i == finalroutes.length){
							callback(null,finalBuses);
						}
					}
				);
			}
		}

	],function(err,results){
		console.log(results);
		if(err !== null){
			res.json(err);
		}else if(results !== null){
			res.json(results);
		}
	});

});
router.get('/findNearBuses', function(req, res) {
	Bus.find(
		{
			cloc : {
				$near:{
					 $geometry: { type: "Point",  coordinates: [ req.query.lng, req.query.lat ] },
					 $maxDistance: 50000
				}
			}
		},function(err,allBus){
			if(err){
				res.json({ success: false , msg: 404 });
			}else {
				res.json({ success: true , data: allBus });
			}
		}
	);
});




module.exports = router;
