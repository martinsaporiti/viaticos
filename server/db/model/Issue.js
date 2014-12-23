'use strict';

var User = require('User.js').User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = mongoose.Schema({

		status : {id: ObjectId, name: String}, 
		summary : String, 
		date : Date,
		created: Date, 
		approved: Date, 
		liquidation: Date,
		reporter : {type: Schema.Types.ObjectId, ref: 'User'},
		mode : {id: ObjectId, name: String}, 
		area : {id: ObjectId, name: String}, 
		client : {id: ObjectId, name: String}, 
		assigned : {type: Schema.Types.ObjectId, ref: 'User'}

	}

});

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = {
  Issue: Issue
}
