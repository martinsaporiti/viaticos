'use strict';

var _ = require('lodash');
var type = require('../../db/model/Type').Type;


// Get list of types
exports.index = function(req, res) {
  type.find({}, function(err, types){
  	if(err){
		console.error(err);
	}else{
		res.json(types);
	}
  });
};