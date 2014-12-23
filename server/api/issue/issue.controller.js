'use strict';

var _ = require('lodash');
var areaController = require ('../area/area.controller.js');
var clientController = require ('../client/client.controller.js');
var modeController = require ('../mode/mode.controller.js');
var statusController = require ('../status/status.controller.js');
var userController = require ('../user/user.controller.js');
var User = require('../../db/model/User').User;


var issues = [
//			{id: '1', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary: 'Viaje a las oficinas de osde para celebrar retro', 
//			 date : '11/11/14',
//			 created: '12/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Facundo Polo', avatar : 'http://runrun.fluxit.com.ar/images/facundo.polo'},
//			 mode : {id: '1', name: 'Auto'}, 
//			 area : {id: '1', name:'Servicios'}, 
//			 client : {id: '1', name: 'OSDE'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }},
//			{id: '2', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary : 'Viaje a las oficinas de osde para reunión con Agustín Fernandez', 
//			 date : '11/10/14',
//			 created: '11/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Pablo Orsini', avatar : 'http://runrun.fluxit.com.ar/images/pablo.orsini'},
//			 mode : {id: '2', name: 'Micro'}, 
//			 area : {id: '1', name:'Servicios'},
//			 client : {id: '1', name: 'OSDE'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }
//			},
//			{id: '3', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary: 'Review en tecplata', 
//			 date : '11/09/14',
//			 created: '11/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Belen Albazan', avatar : 'http://runrun.fluxit.com.ar/images/belen.almazan'},
//			 mode : {id: '2', name: 'Micro'}, 
//			 area : {id: '1', name:'Servicios'},
//			 client : {id: '2', name: 'Tecplata'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }
//			
//			},
//			{id: '4', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary: 'Reunión estratégica en Bunge', 
//			 date : '11/04/14',
//			 created: '11/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Cesar Vargas', avatar : 'http://runrun.fluxit.com.ar/images/cesar.vargas'},
//			 mode : {id: '2', name: 'Micro'}, 
//			 area : {id: '1', name:'Servicios'},
//			 client : {id: '1', name: 'OSDE'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }
//			},
//			{id: '5', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary: 'Retro', 
//			 date : '19/11/14',
//			 created: '11/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Anselmo Abadia', avatar : 'http://runrun.fluxit.com.ar/images/anselmo.abadia'},
//			 mode : {id: '2', name: 'Micro'}, 
//			 area : {id: '1', name:'Servicios'},
//			 client : {id: '1', name: 'OSDE'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }
//			},
//			{id: '6', 
//			 status: {id: '1', name:'Abierto'}, 
//			 summary: 'Reunión con equipos de CABA', 
//			 date : '20/11/14',
//			 created: '11/11/14', 
//			 approved: '11/11/14',
//			 liquidation: '11/11/14',
//			 reporter : {name: 'Agustina Garriga', avatar : 'http://runrun.fluxit.com.ar/images/agustina.garriga'},
//			 mode : {id: '2', name: 'Micro'}, 
//			 area : {id: '2', name:'Valor Humano'},
//			 client : {id: '1', name: 'OSDE'},
//			 assigned : {
//			  id: '6',	
//			  username : 'martin.saporiti', 
//			  name : 'Martín Saporiti' , 
//			  canApprove : true,
//			  canClose : false,
//			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti'
//			 }
//			}

];

exports.getIssueById = function(id){
	var filteredissues = issues.filter(function (element) { 
    	return element.id === id;
	});
	return filteredissues[0];
};


// Get list of issues
exports.index = function(req, res) {
	//TODO: tiene que retornar los issues asignados al usuario logueado.
	res.json(issues);
}

exports.delete = function(req,res){
	console.log('Deleting issue: ' + req.param('issueId'));
	var issueId = req.param('issueId');
	issues.splice(issueId-1, 1);
	var response = {
    	data : issues,
		status  : 200,
    	success : 'Deleted Successfully'
	}
	res.json(200, response);
}

// Approve an issue. Set status as 'Approved'.
exports.approveIssue = function(req, res){
	var issueId = req.param('issueId');
	console.log('Approving issue: ' + req.param('issueId'));
	
	var filteredissues = issues.filter(function (element) { 
    	return element.id === issueId;
	});
	
	var issue = filteredissues[0];
	issue.status = {id: '2', name:'Aprobado'};
	issue.approved = Date.now();
	
	var response = {
    	data : issue,
		status  : 200,
    	success : 'Approved Successfully'
	}
	res.json(200, response);
}

/*
 * Add an issue.
 */
exports.addIssue = function(req, res){
	
	var issue = req.param('issue');
	console.log(issue);
//	console.log('Area: ' + issue.area);
	// Se crea el issue
//	issue.id = issues.length + 1;
//	issue.area = areaController.getAreaById(issue.area);
//	issue.client = clientController.getClientById(issue.client.id);
//	issue.mode = modeController.getModeById(issue.mode);
//	issue.status = statusController.getStatusById('1');
//	issue.assigned = userController.getUserById(issue.assigned.id);
//	issue.reporter = userController.getUserById(issue.reporter);
	
	
	issue.created = Date.now();
	
	User.findById(issue.reporter._id, function (err, reporter){
		if(err){
			console.error(err);
		}else{
			issue.reporter = reporter;
		}
	});
	
	
	// Se persiste el issue.
	console.log('Issue a guardar: ' + issue);
	issues.push(issue);
	
	// Se arma la resupusta.
	var response = {
    	data : issue,
		status  : 200,
    	success : 'Added Successfully'
	}
	res.json(200, response);
}


// Update an issue
exports.editIssue = function(req, res){
	
	console.log('Editando issue');
	
	var issue = req.param('issue');
	console.log(issue);
	
	var idIssue = issue.id;
	var indexes = issues.map(function(obj, index) {
		if(obj.id == idIssue) {
			return index;
		}
	}).filter(isFinite);
	
	console.log(indexes);
	var index = indexes[0];
	
	issues[index].area = issue.area;
	issues[index].client = issue.client.id;
	issues[index].mode = issue.mode;
	issues[index].status = issue.status;
	issues[index].assigned = userController.getUserById(issue.assigned.id);
	issues[index].reporter = userController.getUserById(issue.reporter);
	issues[index].created = issue.created;
	issues[index].ticket = issue.ticket;
	issues[index].amount = issue.amount;

	// Se persiste el issue.
	console.log(issues[index]);
	
	// Se arma la respuesta.
	var response = {
    	data : issues[index],
		status  : 200,
    	success : 'Added Successfully'
	}
	res.json(200, response);
}