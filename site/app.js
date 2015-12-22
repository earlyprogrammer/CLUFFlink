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
		when('/home', {
			templateUrl: 'home.html'
		}).
		otherwise({
			redirectTo: '/home'
		});
});

app.factory('directory', function() {
	var families = familiesStore;
	var persons = personsStore;
	
	
	return {
		families : function(i) {
			if (i !== undefined) {
				return families[i];
			}
			else {
				return families;
			}
		},
		persons : function(i) {
			if (i !== undefined) {
				return persons[i];
			}
			else {
				return persons;
			}
		}
	}
});