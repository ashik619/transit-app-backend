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
	temp.busId = req.body.busId;
    temp.routeId = req.body.routeId;
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

router.post('/updateCurrentLoc', function(req, res) {
    Bus.findOneAndUpdate({busId : req.body.id},{$set: { cloc: { type: "Point", coordinates: [ req.body.lng, req.body.lat ] }  }},{new: true},function(err,bus){
			if(err){
				res.json({ success: false , msg: 404 });
			}else {
				if(bus){
					res.json({ success: false , msg: 200 });
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
					console.log(busStop[0]);
					callback(null,busStop[0]);
				}else{
					callback("no bus found",null);
				}
			}
		}
	);
}

router.post('/findMyBus', function(req, res) {
	
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
					  console.log(err);
					}else{
						console.log(results);
						res.json(results);
					}
		  }
	);
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
			var srcBsId =  results[0].stopId;
			var dstBsId =  results[1].stopId;
			Route.
			
		}
		
	],function(err,results){
		
	});
	    
});



	
module.exports = router;
