
'use strict';

var mongoose = require('mongoose');
var TypeSchema = mongoose.Schema({
    name: String
});

var Type = mongoose.model('Type', TypeSchema);

// Populo los tipos de viáticos.
Type.find({}, function(err, types){
	if(err){
		console.error(err);
	}else{
		if(types.length == 0){
			var type_viaje = new Type({name: 'Viaje'});
			type_viaje.save(function(){
				console.log('type_viaje ' + type_viaje.id); 
			});

			var type_estacionamiento = new Type({name: 'Estacionamiento'});
			type_estacionamiento.save(function(){
				console.log('type_estacionamiento ' + type_estacionamiento.id); 
			});
		}else{
			console.log('loading types:'  + types); 
		}
	}

});

module.exports = {
  Type: Type
}
