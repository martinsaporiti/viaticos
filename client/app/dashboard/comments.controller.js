'use strict';

angular.module('angularFullStackApp')
	.controller('ModalInstanceCommentsCtrl', function ($scope, $modalInstance, issue) {

	$scope.issue = issue; 

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
