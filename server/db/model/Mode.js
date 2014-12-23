
'use strict';

var mongoose = require('mongoose');
var ModeSchema = mongoose.Schema({
    name: String
});

var Mode = mongoose.model('Mode', ModeSchema);

// Populo los Modes.
Mode.find({}, function(err, modes){
	if(err){
		console.error(err);
	}else{
		if(modes.length == 0){
			var auto = new Mode({name: 'Auto'});
			auto.save(function(){
				console.log('auto ' + auto.id); 
			});

			var micro = new Mode({name: 'Micro'});
			micro.save(function(){
				console.log('Micro ' + micro.id); 
			});
		}else{
			console.log('loading Modes:'  + modes); 
		}
	}

});

module.exports = {
  Mode: Mode
}