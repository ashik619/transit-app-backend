var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
var Owner = require('../models/owner.js');
var Bus = require('../models/bus.js');

router.post('/createOwner', function(req, res) {
	var temp = new Owner();
	temp.name = req.body.name;
	temp.ownerId = req.body.ownerId;
	temp.save(function(err){
		if(err){
			res.json({ success: false , msg: err });
		}else{
			res.json({ success: true , msg: "Owner Created" });
		}
	});
});

router.post('/addBus', function(req, res) {
	Owner.findOne({ownerId : req.body.id},function(err,owner){
        if(err){
			res.json({ success: false , msg: "Owner not found" });
        }else {
      			if(owner.busIds.indexOf(req.body.bsId) > -1){
      				res.json({ success: false , msg: "Bus already added" });
      			}else{
      				Owner.update(
      				{ _id: owner._id },
      				{ $push: { busIds: req.body.bsId } },
      				function(err,raw){
      					if(err){
      						res.json({ success: false , msg: "Some error try again later" });
      					}else res.json({ success: true , msg: "Bus added" });
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
