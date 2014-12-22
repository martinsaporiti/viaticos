'use strict';

var _ = require('lodash');
var client = require('../../db/model/Client').Client;

exports.getAll = function(){
	
	client.find({}, function(err, clients){
		if(err){
			console.error(err);
		}else{
			return clients;
		}
	});
};

exports.getClientById = function(id){

	var filteredClients = clients.filter(function (element) { 
    	return element.id === id;
	});
	
	return filteredClients[0];
};

// Get list of clients
exports.index = function(req, res) {
	client.find({}, function(err, clients){
		if(err){
			console.error(err);
		}else{
  			res.json(clients);
		}
	});	
};