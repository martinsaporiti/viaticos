'use strict';

angular.module('angularFullStackApp')
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/user/login.html',
        controller: 'UserCtrl',
		data: {
		  authorizedRoles: [USER_ROLES.guest]
		}
      });
  });
