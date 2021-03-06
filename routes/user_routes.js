var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var BusStop = require('../models/busStop.js');

router.post('/createBusStop', function(req, res) {
	var temp = new BusStop();
	temp.name = req.body.name;
	temp.stopId = req.body.stopId;
	temp.loc = {type: "Point",point:[req.body.lng,req.body.lat]}
	temp.save(function(err){
		if(err){
			return res.json({ success: false , 
				msg: 500 });
		}
	});
	res.json({ success: true , msg: 200 });				
	
});

router.get('/getBusStops', function(req, res) {
	console.log('api hit');
	BusStop.find(function(err, user) {
		if (err) {
			return res.json({ success: false , 
				msg: 500 });
			}
		return res.json({ success: true , BusStops: BusStops });
	});
	
	
});

module.exports = router;
