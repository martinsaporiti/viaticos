
var soap = require('soap');
var url = 'http://jira.intranet.fluxit.com.ar/jira/rpc/soap/jirasoapservice-v2?wsdl';
var unresolvedJiraFilter = '10232';


/*

*/
exports.getUser = function(token, userName, callback){
	var args = {in0: token, in1: userName};
	soap.createClient(url, function(err, client){
		if (err){
			console.error(err);
			callback(err);
		}else{
			client.getUser(args, function(err, result){
				//console.log(result);
				callback(result);
			});
		}
	});
}

/*
Retorna todos los issues no resultos a nombre del usuario logueado.
Utiliza un filtro propio de JIRA.
*/
exports.getUnresolvedIssues = function(token, callback){
	var args = {in0: token, in1: unresolvedJiraFilter};
	soap.createClient(url, function(err, client) {	 
		if(err){
			console.error(err);
			callback(err);
		}else{
			client.getIssuesFromFilter(args, function(err, result) {
				//console.log(JSON.stringify(result));
				// NOTA: Si el resultado es un arreglo de dimensión = 1 no se debe iterar.
				// OJO: cuando viene un arrglo de dimensión > 1 se debe iterar. ;
				data = [];
				for (var i in result.getIssuesFromFilterReturn.getIssuesFromFilterReturn){
					data.push({
						id      : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].id.$value,
						key     : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].key.$value, 
						status  : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].status.$value,
						summary : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].summary.$value,
						created : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].created.$value,
						reporter: result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].reporter.$value,
						area    : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].
						                 customFieldValues.customFieldValues[0].values.values.$value, 
						client    : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].
						                 customFieldValues.customFieldValues[1].values.values.$value, 
						modo    : result.getIssuesFromFilterReturn.getIssuesFromFilterReturn[i].
						customFieldValues.customFieldValues[5].values.values.$value
					});
				}
				callback(data);
			  });
		}
	});
	
}

/**
Función que retorna todos los estados posibles del JIRA.
retorna un array de la forma:
	{
		id: identificador del estado
		name: nombre del estado
	}
*/
exports.getStatuses = function(token, callback){
	var args = {in0: token};
	soap.createClient(url, function(err, client) {	 
		if(err){
			console.error(err);
			callback(err);
		}else{
			client.getStatuses(args, function(err, result) {
				data = [];
				for (var i in result.getStatusesReturn.getStatusesReturn){
					/*console.info(result.getStatusesReturn.getStatusesReturn[i].name.$value);
					console.info(result.getStatusesReturn.getStatusesReturn[i].id.$value);*/
					data.push({
							   id: result.getStatusesReturn.getStatusesReturn[i].id.$value,
							   name: result.getStatusesReturn.getStatusesReturn[i].name.$value});
				}
				callback(data);
			});
		}
	});
}