'use strict';

angular.module('angularFullStackApp').
	controller('DashboardCtrl', function ($scope, $http, $modal) {
		
		$scope.issues = [];
		$scope.areas = [];
		$scope.clients = [];
		$scope.modes = [];
		$scope.leaders = [];
		$scope.types = [];
		$scope.issue = {};

		/* 
		 * Aquí se inicializan los datos traidos del backend a mostrar.
		 */
		
		$http.get('/api/issues').success(function(issues) {
		  $scope.issues = issues;
		});
	
		$http.get('/api/areas').success(function(areas) {
		  $scope.areas = areas;
		});

		$http.get('/api/clients').success(function(clients) {
		  $scope.clients = clients;
		});

		$http.get('/api/modes').success(function(modes) {
		  $scope.modes = modes;
		});

		$http.get('/api/users/leaders').success(function(leaders) {
		  $scope.leaders = leaders;	
		});
	
		$http.get('/api/types').success(function(types) {
		  $scope.types = types;
		});
	
		/* *** */

		// Muestra el botón de comentarios solamente si tiene comentarios.
		$scope.showCommentsButton = function(issue){
			return issue.comments.length > 0;
		}
		
		$scope.showComments = function(issue){
			$scope.openCommentsModal(issue);
		}
		
		$scope.removeIssue = function(issueId, index){
 			$http.delete('/api/issues/' + issueId)
				.success(function(result) {
					$scope.issues.splice(index, 1);
				});	
		}
		
		
		$scope.createIssue = function(){
			$scope.issue = {};
			$scope.open('create');
		}
		
		$scope.editIssue = function(issue){
			$scope.issue = issue;
			$scope.open('edit');
		}
		
		$scope.open = function (mode) {
			var modalInstance = $modal.open({
			  templateUrl: 'issueForm.html',
			  controller: 'ModalInstanceCtrl',
//			  size: size,
			  mode : mode,
			  resolve: {
				areas : function(){
				  return $scope.areas;
				},
				modes : function(){
				  return $scope.modes;
				},
				clients : function(){
				  return $scope.clients;
				},
				
				issue : function(){
				  return $scope.issue;	
				},
				  
				leaders : function(){
				  return $scope.leaders;	
				},
				types : function(){
				  return $scope.types;
				},
				mode : function(){
				  return mode;
				}  
			  }
			});

			modalInstance.result.then(function (issue){
				if (mode == 'create'){
					$scope.issues.push(issue);
				}
			}, function () {
			  //TODO mostrar un error.
			});
		};
	
	
		// 
		$scope.openAssignApproveModal = function (mode, issueId, index) {
			var modalInstance = $modal.open({
			  templateUrl: 'assignApproveForm.html',
			  controller: 'ModalInstanceAssAprCtrl',
//			  size: size,
			  mode : mode,
			  resolve: {
				issueId : function(){
				  return issueId;	
				},
				leaders : function(){
				  return $scope.leaders;	
				},
				mode : function(){
				  return mode;
				}  
			  }
			});


			modalInstance.result.then(function (result){
				// Si fue todo bien...
				$scope.issues.splice(index, 1);
			}, function () {
				// Si falló la asignación.
			});
		};
		
	
		// Funcionalidad para abrir la ventana modal de comentarios 
		// de un issue.
		$scope.openCommentsModal = function (issue) {
			var modalInstance = $modal.open({
			  templateUrl: 'comments.html',
			  controller: 'ModalInstanceCommentsCtrl',
			  resolve: { 
				  issue : function(){
					  return issue;
				  }
			  }
			});


			modalInstance.result.then(function (result){
				//
			}, function () {
				// 
			});
		};
 });
