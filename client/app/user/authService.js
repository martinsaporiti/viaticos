
'use strict';

angular.module('angularFullStackApp')

	.factory('AuthService', function ($http, Session) {
	  var authService = {};

	  authService.login = function (credentials) {
		return $http
		  .post('/api/users/login', {'credentials': credentials})
		  .then(function (res) {
			Session.create(res.data.id, res.data.user);
			return res.data.user;
		  });
	  };

	  authService.isAuthenticated = function () {
		return !!Session.id;
	  };

	  authService.isAuthorized = function (authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
		  authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() &&
		  authorizedRoles.indexOf(Session.userRole) !== -1);
	  };

	  return authService;
	})

	.service('Session', function () {

	  this.create = function (sessionId, user) {
		this.id = sessionId;
		this.user = user;
		this.userRole = user.role;
	  };

	  this.destroy = function () {
		this.id = null;
		this.user = null;
		this.userRole = null;
	  };

	  return this;
	})

	.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
	  all: '*',
	  admin: 'admin',
	  leader: 'leader',
	  guest: 'guest'
	})


	.config(function ($httpProvider) {
	  $httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
		  return $injector.get('AuthInterceptor');
		}
	  ]);
	})

	.factory('AuthInterceptor', function ($rootScope, $q,
										  AUTH_EVENTS) {
	  return {
		responseError: function (response) { 
		  $rootScope.$broadcast({
			401: AUTH_EVENTS.notAuthenticated,
			403: AUTH_EVENTS.notAuthorized,
			419: AUTH_EVENTS.sessionTimeout,
			440: AUTH_EVENTS.sessionTimeout
		  }[response.status], response);
		  return $q.reject(response);
		}
	  };
	})


