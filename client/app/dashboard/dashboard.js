'use strict';

angular.module('angularFullStackApp')
  
.config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
		data: {
		  authorizedRoles: [USER_ROLES.admin, USER_ROLES.leader]
		}
      });
  });
