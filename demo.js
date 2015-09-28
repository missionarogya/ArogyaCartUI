var home = angular.module('home', ['ngRoute']);

home.controller('homeController', function($scope, $http, $location, $rootScope) {
	$http.get('procedures.json').then(function(result){
	$rootScope.procedures = result.data;
	});
	$http.get('hospitals.json').then(function(result){
		$scope.hospitals = result.data;
	});	
	$scope.goToProcedurePage = function(path){
		$location.path(path);
	}
});

home.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/procedure/:id',{
		templateUrl:'procedureDetails.html',
		controller: 'procedureDetailsController'
	})
	.when('/compareHospitals/:name/:id',{
		templateUrl:'compareHospitalDetails.html',
		controller: 'compareHospitalDetailsController'
	});
}]);

home.controller('procedureDetailsController', function($filter, $http, $scope, $routeParams, $rootScope) {
		$http.get($routeParams.id+'.json').then(function(result){
			$scope.procedureHospitalDetails = result.data;
		});
		$scope.selectedProcDetails = $filter('filter')($rootScope.procedures, {id:$routeParams.id})[0];
	});
	
home.controller('compareHospitalDetailsController', function($http, $scope, $routeParams) {
		var sortType = 'asc';
		$http.get($routeParams.id+'.json').then(function(result){
			$scope.procedureHospitalComparisonDetails = result.data;
		});
		$scope.selectedProcedureForHospitalComparison = $routeParams.name;
		$scope.sortBy = function(column){
			if(sortType == 'asc'){
				sortType = 'desc';
				$scope.sortingColumn = column;
			}
			else{
				sortType = 'asc';
				$scope.sortingColumn = '-'+column;
			}
		}
	});
	
	