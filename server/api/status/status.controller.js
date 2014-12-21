'use strict';

var _ = require('lodash');

var statuss = [{id: '1', name: 'Abierto'}, {id: '2', name: 'Aprobado'}, {id: '3', name: 'Cerrado'}]


exports.getAll = function(){
	return statuss;
};

exports.getStatusById = function(id){

	var filteredStatuss = statuss.filter(function (element) { 
    	return element.id === id;
	});

	return filteredStatuss[0];
};

// Get list of statuss
exports.index = function(req, res) {
  res.json(statuss);
};

