var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Owner = require('../models/owner.js');
var Bus = require('../models/bus.js');
var Driver = require('../models/driver.js');
var passwordGenerator = require('generate-password');
const uuidv4 = require('uuid/v4');

router.post('/createDriver', function(req, res) {
	var temp = new Bus();
	temp.name = req.body.name;
	temp.phoneNumber = req.body.phoneNumber
	temp.ownerId = req.body.ownerId;
	temp.password = passwordGenerator.generate({
    length: 5,
    numbers: false
	});
	temp.apiKey = uuidv4();
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: "Driver Created" });
		}
	});
});

router.post('/assignBus', function(req, res) {
	Driver.findOne({userId : req.body.driverId},function(err,driver){
        if(err){
					res.json({ success: false , msg: "Driver not found" });
        }else {
      			if(driver){
							driver.busId = req.body.busId;
							driver.save(function(err){
								if(err){
									res.json({ success: false , msg: err });
								}else{
									res.json({ success: true , msg: "Bus Assigned" });
								}
							});
						}
        }
    });
});

router.post('/startTrip.', function(req, res) {
	Bus.findOneAndUpdate({busId : req.body.busId},{$set: { status: req.body.status  }},{new: true},function(err,bus){
		if(err){
			res.json({ success: false , msg: 404 });
		}else {
			if(bus){
				res.json({ success: false , msg: 200 });
			}else res.json({ success: false , msg: 404 });
		}
	});
});

router.get('/getOwners', function(req, res) {
	Owner.find(function(err, owners) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			res.json({ success: true , data: owners });
		}
	});
});

router.get('/getOwnerBuses', function(req, res) {
	Owner.findOne({ownerId : req.query.id},'busIds',function(err,owner){
			if(err){
				res.json({ success: false , msg: 404 });
			}else {
				if(owner){
					Bus.find({busId : {$in : owner.busIds}},
								 function(err,allBus){
									if(err){
									res.json({ success: false , msg: 500 });
                }else res.json({ success: true , data : allBus });

								 });
				}else res.json({ success: false , msg: 500 });
			}
		});
});

module.exports = router;
