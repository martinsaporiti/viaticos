'use strict';

var _ = require('lodash');
var Status = require('../../db/model/Status').Status;


exports.getAll = function(){
	return statuss;
};

// Get list of statuss
exports.index = function(req, res) {
	Status.find({}, function(err, statuss){
		if(err){
			console.error(err);
		}else{
			res.json(statuss);
		}
	});
};


// Retorna el Status con name = al parámetro name.
exports.getStatusByName = function(name){
	Status.findOne({ name: name}, function (err, result){
	  if(err){
		console.error(err);
	  }else{
		console.log(result);  
		return result;	
	  }
	});
};