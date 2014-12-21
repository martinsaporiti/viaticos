'use strict';

var _ = require('lodash');
var client = require('../../db/model/Client').Client;

//var clients = [
//	  {id: '1', name: 'OSDE'},
//	  {id: '2', name: 'Tecplata'},
//	  {id: '3', name: 'Exolgan'},
//	  {id: '4', name: 'RedHat'},
//	  {id: '5', name: 'Akapol'}
//  ];

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