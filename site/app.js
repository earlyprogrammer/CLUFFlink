console.log("app found");

var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {
	$routeProvider.
		when('/directory', {
			templateUrl: 'directory/directory.html',
			controller: 'directoryCtrl'
		}).
		when('/files', {
			templateUrl: 'files/files.html',
			controller: 'filesCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});