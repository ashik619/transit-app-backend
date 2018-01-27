var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Owner = require('../models/owner.js');
var Bus = require('../models/bus.js');
var Route = require('../models/route.js');
var passwordGenerator = require('generate-password');
const uuidv4 = require('uuid/v4');

router.post('/createOwner', function(req, res) {
	var temp = new Owner();
	temp.name = req.body.name;
	temp.phoneNumber = req.body.phoneNumber;
	temp.password = passwordGenerator.generate({
    length: 5,
    numbers: false
	});
	temp.apiKey = uuidv4();
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: "Owner Created" });
		}
	});
});
//id - userID,
//bsId
router.post('/addBus', function(req, res) {
	Owner.findOne({ownerId : req.body.id},function(err,owner){
        if(err){
						res.json({ success: false , msg: "Owner not found" });
        }else {
      			if(owner.busIds.indexOf(req.body.bsId) > -1){
							Bus.findOneAndUpdate({busId : req.body.bsId},{$set: { ownerId: req.body.id  }},{new: true},function(err,bus){
								if(err){
									res.json({ success: false , msg: "Some error try again later" });
								}else {
									if(bus){
										res.json({ success: false , msg: "Bus already added" });
									}else res.json({ success: false , msg: 404 });
								}
							});
      			}else{
      				Owner.update(
      				{ _id: owner._id },
      				{ $push: { busIds: req.body.bsId } },
      				function(err,raw){
      					if(err){
      						res.json({ success: false , msg: "Some error try again later" });
      					}else {
									Bus.findOneAndUpdate({busId : req.body.bsId},{$set: { ownerId: req.body.id  }},{new: true},function(err,bus){
										if(err){
											res.json({ success: false , msg: "Some error try again later" });
										}else {
											if(bus){
												res.json({ success: true , msg: "Bus added" });
											}else res.json({ success: false , msg: 404 });
										}
									});
								}
      				}
      				);
      			}
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
	Owner.findOne({ownerId : req.query.ownerId},'busIds',function(err,owner){
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
