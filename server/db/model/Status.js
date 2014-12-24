'use strict';

var mongoose = require('mongoose');
var StatusSchema = mongoose.Schema({
	_id : Number,
    name: String
});

var Status = mongoose.model('Status', StatusSchema);

Status.findOne({ name: 'Abierto'}, function (err, result){
  if(err){
  	console.error(err);
  }else{
  	if(!result){
		console.log('Creando estado Abierto');
		var abierto = new Status({_id: 1, name: 'Abierto'});
		abierto.save(function(){
			console.log('Abierto ' + abierto._id); 
		});
	}
  }
});

Status.findOne({ name: 'Aprobado'}, function (err, result){
  if(err){
  	console.error(err);
  }else{
  	if(!result){
		console.log('Creando estado Aprobado');
		var aprobado = new Status({_id: 2, name: 'Aprobado'});
		aprobado.save(function(){
			console.log('Aprobado ' + aprobado.id); 
		});
	}
  }
});

Status.findOne({ name: 'Cerrado'}, function (err, result){
  if(err){
  	console.error(err);
  }else{
  	if(!result){
		console.log('Creando estado Cerrado');
		var cerrado = new Status({_id: 3, name: 'Cerrado'});
		cerrado.save(function(){
			console.log('Cerrado ' + cerrado.id); 
		});
	}
  }
});



module.exports = {
  Status: Status
}