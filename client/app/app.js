'use strict';

angular.module('angularFullStackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router'
])
	.config(function ($routeProvider, $locationProvider) {
		// Atención: el locationprovider es configurado por cada página en su propio archivos js.
	    // Por ejemplo: dashboard.js
		$locationProvider.html5Mode(true);
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	})


	.controller('ApplicationController', function ($scope, USER_ROLES, AuthService) {
	  $scope.currentUser = null;
	  $scope.userRoles = USER_ROLES;
	  $scope.isAuthorized = AuthService.isAuthorized;
	  $scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	  };

	})

	.run(function ($rootScope, AUTH_EVENTS, AuthService, $location) {
	  $rootScope.$on('$routeChangeStart', function (event, next) {
		var authorizedRoles = next.data.authorizedRoles;
		if (next.$$route.originalPath == '/login'){
			//TODO: Determinar si hay que hacer algo. Caso contrario hay que cambiar 
			// las condiciones y emprolijar el if.
		}else{  
			if (!AuthService.isAuthorized(authorizedRoles)) {
			  event.preventDefault();
			  if (AuthService.isAuthenticated()) {
				// user is not allowed
				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
			  } else {
				// user is not logged in
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				window.location = '/login';
			  }
			}
		}
	  });
	})



