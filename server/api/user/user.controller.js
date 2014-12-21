'use strict';

var _ = require('lodash');

var users = [{
			  id: '1',
			  username : 'cesar.vargas', 
			  name : 'Cesar Vargas' , 
			  canApprove : false,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/cesar.vargas'
			 },
			{
			  id: '2',	
			  username : 'agustina.garriga', 
			  name : 'Agustina Garriga' , 
			  canApprove : true,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/agustina.garriga'
			 }, 
			 {
			  id: '3',	 
			  username : 'facundo.polo', 
			  name : 'Facundo Polo' , 
			  canApprove : false,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/facundo.polo'
			 },
			{
			  id: '4',	
			  username : 'nicolas.garcia', 
			  name : 'Nicolás García' , 
			  canApprove : true,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/nicolas.garcia'
			 },
			{
			  id: '5',	
			  username : 'agustina.chesini', 
			  name : 'Agustina Chesini' , 
			  canApprove : true,
			  canClose : true,
			  avatar: 'http://runrun.fluxit.com.ar/images/agustina.chesini'
			 },
			{
			  id: '6',	
			  username : 'martin.saporiti', 
			  name : 'Martín Saporiti' , 
			  canApprove : true,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti',
			  role : 'admin'	
			 }]

// Este método no debería estar acá. Quizás convenga armar una api especial.
// Además debe autenticar contra el LDAP.
exports.login = function(req, res){
	var userName = req.param('credentials').username;
	var pass = req.param('credentials').password;
	console.log('username: ' + userName + ' password ' + pass);
	var user = users[5];
	
	// Se arma la resupusta.
	var response = {
    	id: '6', 
		user: user,
		status  : 200,
    	success : 'Login Successfully'
	}
	res.json(200, response);
}

exports.getAll = function(){
  return users;
}

exports.getUserById = function(id){
	var filtered = users.filter(function (element) { 
    	return element.id === id;
	});
	
	return filtered[0];
};

exports.getUserByUserName = function(username){
	var filtered = users.filter(function (element) { 
    	return element.username === username;
	});
	
	return filtered[0];
};

// Get list of users
exports.index = function(req, res) {
  res.json(users);
};

exports.leaders = function(req, res){
	var leaders = users.filter(function (element) { 
    	return element.canApprove === true ;
	});
	res.json(leaders);
}