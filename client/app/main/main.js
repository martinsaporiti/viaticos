'use strict';

angular.module('angularFullStackApp')
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',		
		data: {
		  authorizedRoles: [USER_ROLES.guest]
		}
      });
  });