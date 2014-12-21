'use strict';

exports.getEntityById = function(entityName, id){
	
	var filteredArray = array.filter(function (element) { 
    	return element.id === id;
	});

	return filteredArray[0];
}