'use strict';

var _ = require('lodash');
var mode = require('../../db/model/Mode').Mode;


//var modes = [
//	  {id: '1', name:'Auto'},
//	  {id: '2', name:'Micro'}
//  ];


exports.getAll = function(){
  mode.find({}, function(err, modes){
  	if(err){
		console.error(err);
	}else{
		return modes;
	}
  });
}

exports.getModeById = function(id){
	var filteredModes = modes.filter(function (element) { 
    	return element.id === id;
	});
	return filteredModes[0];
};

// Get list of modes
exports.index = function(req, res) {
  mode.find({}, function(err, modes){
  	if(err){
		console.error(err);
	}else{
  		res.json(modes);
	}
  });
};