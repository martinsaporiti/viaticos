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


exports.getIssueById = function(id){
	var filteredissues = issues.filter(function (element) { 
    	return element.id === id;
	});
	return filteredissues[0];
};


// Get list of issues
exports.index = function(req, res) {
	//TODO: tiene que retornar los issues asignados al usuario logueado.
	var actualUser = userController.getActualUser();
	console.log('Obteniendo issues del usuario: ' +  actualUser);
	Issue.find({assigned : actualUser, status: 'Abierto'}).populate('reporter')
		.populate('assigned').exec(function(err, issues){
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
	var assignedId = req.param('assignedId');
	
	console.log('Approving issue: ' + req.param('issueId'));
	console.log('Assigned: ' + req.param('assignedId'));
	
	Issue.findOne({ _id: issueId }, function (err, issue){
		if(!err){
			issue.status = 'Aprobado';
			issue.assigned = assignedId;
			issue.approvedDate =  Date.now();
			issue.save();
			var response = {
				status  : 200,
				success : 'Approved Successfully'
			}
			res.json(200, response);
		}else{
			console.error(err);
			var response = {
				status  : 500,
				error : err
			}
			res.json(500, response);
		}
	});	
	
}

// Assign an issue. 
exports.assignIssue = function(req, res){
	
	var issueId = req.param('issueId');
	var assignedId = req.param('assignedId');
	var comment = req.param('comment');
	
	console.log('Assigning issue: ' + req.param('issueId'));
	console.log('Assigned: ' + req.param('assignedId'));
	
	Issue.findOne({ _id: issueId }, function (err, issue){
		if(!err){
			issue.assigned = assignedId;
			issue.assignedDate =  Date.now();
			var newComment = {
				author : userController.getActualUser(),
				date : Date.now(),
				text : comment,
			};
			issue.comments.push(newComment);
			
			issue.save();
			var response = {
				status  : 200,
				success : 'Assigned Successfully'
			}
			res.json(200, response);
		}else{
			console.error(err);
			var response = {
				status  : 500,
				error : err
			}
			res.json(500, response);
		}
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
		type : issue.type,
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
			Issue.findOne({_id : newIssue.id}).populate('reporter')
					.populate('assigned').exec(function(err, issueToReturn){
			
				// Se arma la resupusta.
				var response = {
					data : issueToReturn,
					status  : 200,
					success : 'Added Successfully'
				}
				res.json(200, response);
				});					
		}else{
			console.error(err);
			var response = {
				status  : 500,
				error : err
			}
			res.json(500, response);
		}
	});
}


// Update an issue
exports.editIssue = function(req, res){
	
	console.log('Editando issue');
	
	var issue = req.param('issue');
	console.log(issue);
	
	Issue.findOne({ _id: issue._id }, function (err, issueToUpdate){
		if(!err){
			issueToUpdate.type = issue.type,
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
			var response = {
				status  : 500,
				error : err
			}
			res.json(500, response);
		}
	});	
}