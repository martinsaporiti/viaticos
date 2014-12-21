'use strict';

var _ = require('lodash');


var clients = [
	  {id: '1', name: 'OSDE'},
	  {id: '2', name: 'Tecplata'},
	  {id: '3', name: 'Exolgan'},
	  {id: '4', name: 'RedHat'},
	  {id: '5', name: 'Akapol'}
  ];

exports.getAll = function(){
	return clients;
};

exports.getClientById = function(id){

	var filteredClients = clients.filter(function (element) { 
    	return element.id === id;
	});
	
	return filteredClients[0];
};

// Get list of clients
exports.index = function(req, res) {
  res.json(clients);
};