
'use strict';

var mongoose = require('mongoose');
var AreaSchema = mongoose.Schema({
    name: String
});

var Area = mongoose.model('Area', AreaSchema);

// Populo las áreas 
Area.find({}, function(err, areas){
	if(err){
		console.error(err);
	}else{
		if(areas.length == 0){
			var area_servicios = new Area({name: 'Servicios'});
			area_servicios.save(function(){
				console.log('area_servicios ' + area_servicios.id); 
			});

			var area_vvhh = new Area({name: 'Valor Humano'});
			area_vvhh.save(function(){
				console.log('area_vvhh ' + area_vvhh.id); 
			});
			var area_infra = new Area({name: 'Infra'});
			area_infra.save(function(){
				console.log('area_infra ' + area_infra.id); 
			});
		}else{
			console.log('loading areas:'  + areas); 
		}
	}

});

module.exports = {
  Area: Area
}