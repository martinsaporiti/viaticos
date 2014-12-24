'use strict';

var _ = require('lodash');
var areaController = require ('../area/area.controller.js');
var clientController = require ('../client/client.controller.js');
var modeController = require ('../mode/mode.controller.js');
var statusController = require ('../status/status.controller.js');
var userController = require ('../user/user.controller.js');
var User = require('../../db/model/User').User;
var Status = require('../../db/model/Status').Status;
var Issue = require('../../db/model/Issue').Issue;


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
	Issue.find({}).populate('reporter').populate('assigned').exec(function(err, issues){
		if(err){
			console.error(err);
		}else{
			
			res.json(issues);
		}
	});
}

// Elimina un issue
exports.delete = function(req,res){
	console.log('Deleting issue: ' + req.param('issueId'));
	var issueId = req.param('issueId');

	Issue.remove({_id : issueId}, function(err){
		if(!err){
			var response = {
				status  : 200,
    			success : 'Deleted Successfully'
			}
			res.json(200, response);	
		}
	});
	
	
}

// Approve an issue. Set status as 'Aprobado'.
exports.approveIssue = function(req, res){
	var issueId = req.param('issueId');
	console.log('Approving issue: ' + req.param('issueId'));
	
	Issue.findOne({ _id: issueId }, function (err, issue){
		if(!err){
			issue.status = 'Aprobado',
			issue.save();
		}else{
			//Retornar un error.
			console.error(err);
		}
	});	
	
	// No debería retornarse el issue aprobado. Solamente un ok.
	Issue.findOne({ _id: issueId }).populate('reporter').populate('assigned').exec(function(err, issue){
		var response = {
			data : issue,
			status  : 200,
			success : 'Approved Successfully'
		}
		res.json(200, response);
	});
	
}

/*
 * Add an issue.
 */
exports.addIssue = function(req, res){
	
	var issue = req.param('issue');
	console.log(issue);

	// Se persiste el issue.
	console.log(' #### Guardando el nuevo Issue: ####');
	console.log(issue);

	var newIssue = new Issue({		
		status: 'Abierto',
		created : Date.now(), 
		date: issue.date,
		summary : issue.summary,
		description : issue.description,
		amount: issue.amount,
		ticket: issue.ticket,
		reporter : issue.reporter._id,
		mode : issue.mode,
		area : issue.area,
		client : issue.client,
		assigned : issue.assigned._id
	});
	
	newIssue.save(function(err){
		if(!err){
			console.log('newIssue ' + newIssue.id); 
		}else{
			console.error(err);
		}
	});

	issue.status = 'Abierto'; 
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
	
	Issue.findOne({ _id: issue._id }, function (err, issueToUpdate){
		if(!err){
			issueToUpdate.area = issue.area;
			issueToUpdate.client = issue.client;
			issueToUpdate.date = issue.date;
			issueToUpdate.mode = issue.mode;
			issueToUpdate.mode = issue.mode;
			issueToUpdate.assigned = issue.assigned_id;
			issueToUpdate.ticket = issue.ticket;
			issueToUpdate.amount = issue.amount;
			issueToUpdate.save();
			// Se arma la respuesta.
			var response = {
				status  : 200,
				success : 'Updated Successfully'
			}
			res.json(200, response);
		}else{
			//Retornar un error.
			console.error(err);
		}
	});	
}