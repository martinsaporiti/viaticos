
'use strict';

var mongoose = require('mongoose');
var ClientSchema = mongoose.Schema({
    name: String
});

var Client = mongoose.model('Client', ClientSchema);

// Populo los tipos de viáticos.
Client.find({}, function(err, clients){
	if(err){
		console.error(err);
	}else{
		if(clients.length == 0){
			var osde = new Client({name: 'OSDE'});
			osde.save(function(){
				console.log('osde ' + osde.id); 
			});

			var tec = new Client({name: 'Tecplata'});
			tec.save(function(){
				console.log('tec ' + tec.id); 
			});
			
			var exol = new Client({name: 'Exolgan'});
			exol.save(function(){
				console.log('exolgan ' + exol.id); 
			});
			
			var interno = new Client({name: 'Interno'});
			interno.save(function(){
				console.log('Interno ' + interno.id); 
			});
		}else{
			console.log('loading clients:'  + clients); 
		}
	}

});

module.exports = {
  Client: Client
}
