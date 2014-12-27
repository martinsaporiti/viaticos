'use strict';

angular.module('angularFullStackApp')
	.controller('ModalInstanceAssAprCtrl', function ($scope, $modalInstance, $http, 
													  Session, issueId, leaders, mode) {

  	
	$scope.leaders = leaders;
	$scope.mode = mode;
	$scope.issueId = issueId;
	$scope.assigned = '';
	$scope.leader = {};
	
	if($scope.mode == 'approve'){
			$scope.title = 'Aprobar';
		}else{
			$scope.title = 'Asignar';
	}
	
	$scope.processForm = function(){
		if($scope.mode == 'approve'){
			$scope.approveIssue();
		}else{
			$scope.assignIssue();
		}
	}
	
	$scope.approveIssue = function(){
		$http.put('/api/issues/' + $scope.issueId + '/approveIssue/', 
				  {assignedId: $scope.assigned._id})
			.success(function(result) {
				$modalInstance.close(result.data);
		});	
	}

	$scope.assignIssue = function(){
		$http.put('/api/issues/' + $scope.issueId + '/assignIssue/' , 
				   {assignedId: $scope.assigned._id})
			.success(function (result){
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

});
