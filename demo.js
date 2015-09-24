var app = angular.module('myApp', ['ngRoute']);

app.controller('myController', function($scope,$http,$location) {
	$http.get('procedures.json').then(function(result){
	$scope.procedures = result.data;
	});
	$http.get('hospitals.json').then(function(result){
		$scope.hospitals = result.data;
	});	
	$scope.gotoNewPage = function($event, id, path){
		$scope.selectedPage = id;
		$location.path(path);
	}
});

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/proc',{
		templateURl:'procedureDetails.html',
		controller: 'myController1'
	});	
}]);

app.controller('myController1', function($scope) {
		$scope.message1 = 'Look! I am an about page.';
	});