var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Bus = require('../models/bus.js');
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
router.post('/findMyBus', function(req, res) {
	var srcBsId;
	var dstBsId;
	async.series([
		async.
				  ],function(err){
		
	});
    
});



	
module.exports = router;
