var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var BusStop = require('../models/busStop.js');

router.get('/',function(req,res){
	res.sendFile('busstop.html', { root: './public/busStop/' });
});

router.post('/createBusStop', function(req, res) {
	var temp = new BusStop();
	temp.name = req.body.name;
	temp.stopId = req.body.stopId;
	temp.loc = {type: "Point",coordinates:[req.body.lng,req.body.lat]};
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: 200 });	
		}
	});
});

router.get('/getBusStops', function(req, res) {
	console.log('api hit');
	BusStop.find(function(err, busstops) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			res.json({ success: true , data: busstops });
		}
	});
});
	
module.exports = router;
