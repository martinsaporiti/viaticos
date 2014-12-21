'use strict';

var _ = require('lodash');


var modes = [
	  {id: '1', name:'Auto'},
	  {id: '2', name:'Micro'}
  ];


exports.getAll = function(){
	return modes;	
}

exports.getModeById = function(id){
	var filteredModes = modes.filter(function (element) { 
    	return element.id === id;
	});
	return filteredModes[0];
};

// Get list of modes
exports.index = function(req, res) {
  res.json(modes);
};