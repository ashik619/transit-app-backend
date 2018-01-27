var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Owner = require('../models/owner.js');
var Bus = require('../models/bus.js');
var Driver = require('../models/driver.js');
var Route = require('../models/route.js');
var passwordGenerator = require('generate-password');
const uuidv4 = require('uuid/v4');
var async = require("async");

router.post('/createDriver', function(req, res) {
	var temp = new Driver();
	temp.name = req.body.name;
	temp.phoneNumber = req.body.phoneNumber
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

router.get('/getAllDrivers', function(req, res) {
	Driver.find(function(err, drivers) {
		if (err) {
			res.json({ success: false , msg: 500 });
		}else{
			res.json({ success: true , data: drivers });
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

router.post('/startTrip', function(req, res) {
	Bus.findOneAndUpdate({busId : req.body.busId},{$set: { status: req.body.status  }},{new: true},function(err,bus){
		if(err){
			res.json({ success: false , msg: 404 });
		}else {
			if(bus){
				res.json({ success: true , msg: 200 });
			}else res.json({ success: false , msg: 404 });
		}
	});
});



router.post('/driverLogin',function(req,res) {
	Driver.findOne({phoneNumber : req.body.phoneNumber}, function(err,driver){
		if(err){
			res.json({ success: false , msgText : "Invalid phone number" });
		}else {
			if(driver){
				if(driver.password === req.body.password){
					res.json({ success: true , msgText : "Login Success", driver : driver });
				}else {
					res.json({ success: false , msgText : "Wrong password" });
				}
			}else {
				res.json({ success: false , msgText : "Invalid phone number" });
			}
		}
	})
});
router.get('/getDriverTripDetails',function(req,res){
	async.waterfall([
		function(callback) {
			Driver.findOne({userId : req.query.id}, function(err,driver){
				if(err){
					callback(true, null);
				}else {
					if(driver){
						callback(null, driver);
					}else {
						callback(true, null);
					}
				}
			});
    },
		function(driver,callback){
			Bus.findOne({busId : driver.busId},function(err,bus){
				if(err){
					callback(true, null);
				}else {
					if(bus){
						callback(null, driver , bus);
					}else {
						callback(true, null);
					}
				}
			});
		},
		function(driver, bus, callback){
			Owner.findOne({ownerId : bus.ownerId},function(err,owner){
				if(err){
					callback(true,null);
				}else {
					if(owner){
						callback(null, driver, bus, owner);
					}else {
						callback(true, null);
					}
				}
			});
		},
		function(driver, bus, owner, callback){
			Route.findOne({routeId : bus.routeId},function(err,route){
				if(err){
					callback(true,null);
				}else {
					if(route){
						var responseBody = {'driver' : driver, 'bus' : bus,'owner' : owner, 'route' : route };
						callback(null, responseBody);
					}else {
						callback(true, null);
					}
				}
			});
		}
	],function(err,result){
		if(err){
			res.json({ success: false , msgText : "No Bus Assigned to you" });
		}else {
			res.json({ success: true , data : result });
		}
	});
})


module.exports = router;
