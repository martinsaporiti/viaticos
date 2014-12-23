
'use strict';

var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({    		
	username : String, 
	name : String,
	avatar: String,
	role : String
});

var User = mongoose.model('User', UserSchema);

// Populo los usuarios.
User.find({}, function(err, users){
	if(err){
		console.error(err);
	}else{
		if(users.length == 0){
			var sapo = new User({			  
			  username : 'martin.saporiti', 
			  name : 'Martín Saporiti' , 
			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti',
			  role : 'admin'});
			
			sapo.save(function(){
				console.log('sapo ' + sapo.id); 
			});

			var jey = new User({			  
			  username : 'nicolas.garcia', 
			  name : 'Nicolás García' , 
			  avatar: 'http://runrun.fluxit.com.ar/images/nicolas.garcia',
			  role : 'leader'});
			
			jey.save(function(){
				console.log('Jey ' + jey.id); 
			});
			
			var polo = new User({			  
			  username : 'facundo.polo', 
			  name : 'Facundo Polo' , 
			  avatar: 'http://runrun.fluxit.com.ar/images/facundo.polo',
			  role : 'leader'});
			
			polo.save(function(){
				console.log('Polo ' + polo.id); 
			});
			
		}else{
			console.log('loading users:'  + users); 
		}
	}

});

module.exports = {
  User: User
}