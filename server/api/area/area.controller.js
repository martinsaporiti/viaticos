'use strict';

var _ = require('lodash');
var area = require('../../db/model/area').Area;

//var areas = [
//		{id: '1', name: 'Servicios'},
//		{id: '2', name: 'Valor Humano'}, 
//		{id: '3', name: 'Facilities'},
//		{id: '4', name: 'Infra'}
//	   ];	

exports.getAll = function(){
	area.find({}, function(err, areas){
		if(err){
			console.error('## Error buscando todas las áreas: ##' + err);
		}else{
			return areas;
		}
	});
}

exports.getAreaById = function(id){

	var filteredAreas = areas.filter(function (element) { 
    	return element.id === id;
	});
	
	return filteredAreas[0];
};

// Get list of areas
exports.index = function(req, res) {
  area.find({}, function(err, areas){
  	if(err){
		console.error('## Error buscando todas las áreas: ##' + err);
	}else{
		res.json(areas);
	}
  });
};


