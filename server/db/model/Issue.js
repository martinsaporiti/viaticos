'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = mongoose.Schema({

		status : String, 
		summary : String, 
		date : Date,
		created: Date, 
		assignedDate: Date,
		approvedDate: Date, 
		liquidationDate: Date,
		description : String,
		amount: Number,
		ticket: String,
		reporter : {type: Schema.Types.ObjectId, ref: 'User'},
		type : {_id: mongoose.Schema.ObjectId, name: String}, 
		mode : {_id: mongoose.Schema.ObjectId, name: String}, 
		area : {_id: mongoose.Schema.ObjectId, name: String}, 
		client : {_id: mongoose.Schema.ObjectId, name: String}, 
		assigned : {type: Schema.Types.ObjectId, ref: 'User'},
		comments : [{author: {type: Schema.Types.ObjectId, ref: 'User'}, date: Date, text: String}]
	});

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = {
  Issue: Issue
}
