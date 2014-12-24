'use strict';

angular.module('angularFullStackApp')
	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, Session, areas, 
												modes, clients, leaders, types, issue, mode) {

  	
	$scope.areas = areas;	
	$scope.clients = clients;	
	$scope.modes = modes;	
	$scope.leaders = leaders;
	$scope.types = types;
	$scope.issue = issue;	
	$scope.mode = mode;
	
	$scope.processForm = function(){
		if($scope.mode == 'create'){
			$scope.addIssue();
		}else{
			$scope.editIssue();
		}
	}
	
	$scope.addIssue = function(){
		$scope.issue.reporter = Session.user;
		$http.post('/api/issues/', {issue : $scope.issue})
			.success(function (result, status, headers, config){
				$modalInstance.close(result.data);
			})
			.error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}

	$scope.editIssue = function(){
		$scope.issue.reporter = Session.user;
		$http.post('/api/issues/' + issue._id, {issue : $scope.issue})
			.success(function (result, status, headers, config){
				$modalInstance.close(result.data);
			})
			.error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	
/**
 DATE
 **/
	
  $scope.format = 'dd-MMMM-yyyy'

  $scope.today = function() {
   $scope.dt = new Date();
  };
	
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
	
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


});
