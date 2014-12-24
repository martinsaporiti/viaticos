'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = mongoose.Schema({

		status : String, 
		summary : String, 
		date : Date,
		created: Date, 
		approved: Date, 
		liquidation: Date,
		description : String,
		amount: Number,
		ticket: String,
		reporter : {type: Schema.Types.ObjectId, ref: 'User'},
		mode : {_id: mongoose.Schema.ObjectId, name: String}, 
		area : {_id: mongoose.Schema.ObjectId, name: String}, 
		client : {_id: mongoose.Schema.ObjectId, name: String}, 
		assigned : {type: Schema.Types.ObjectId, ref: 'User'}

	});

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = {
  Issue: Issue
}
