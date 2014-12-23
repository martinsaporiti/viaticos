
'use strict';

var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({    		
	username : String, 
	name : String,
	canApprove : Boolean,
	canClose : Boolean,
	avatar: String,
	role : String
});

var User = mongoose.model('User', UserSchema);

// Populo los tipos de viáticos.
User.find({}, function(err, users){
	if(err){
		console.error(err);
	}else{
		if(users.length == 0){
			var sapo = new User({			  
			  username : 'martin.saporiti', 
			  name : 'Martín Saporiti' , 
			  canApprove : true,
			  canClose : false,
			  avatar: 'http://runrun.fluxit.com.ar/images/martin.saporiti',
			  role : 'admin'});
			sapo.save(function(){
				console.log('sapo ' + sapo.id); 
			});

		}else{
			console.log('loading users:'  + users); 
		}
	}

});

module.exports = {
  User: User
}