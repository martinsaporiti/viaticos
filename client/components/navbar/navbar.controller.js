'use strict';

angular.module('angularFullStackApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
	  'title' : 'Dashboard',
	  'link' : '/dashboard'	
	},{
	  'title' : 'Login',
	  'link' : '/login' 	
	}];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  })

//	.directive('loginDialog', function (AUTH_EVENTS) {
//	  return {
//		restrict: 'A',
//		template: '<div ng-if="visible" ng-include="app/user/login.html">',
//		link: function (scope) {
//		  var showDialog = function () {
//			scope.visible = true;
//		  };
//
//		  scope.visible = false;
//		  scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
//		  scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
//		}
//	  }
//	})