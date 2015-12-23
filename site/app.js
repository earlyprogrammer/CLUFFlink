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
		when('/family/:familyId', {
			templateUrl: 'family/family.html',
			controller: 'familyCtrl'
		}).
		when('/person/:personId', {
			templateUrl: 'person/person.html',
			controller: 'personCtrl'
		}).
		otherwise({
			redirectTo: '/home'
		});
});

app.factory('directory', function($filter) {
	var families = familiesStore;
	var persons = personsStore;
	
	
	return {
		families : function(i) {
			if (i !== undefined) {
				for (var j = 0; j < families.length; j++) {
					if (families[j].id == i) {
						return families[j];
					}
				};
			}
			else {
				return families;
			}
		},
		persons : function(i) {
			if (i !== undefined) {
				for (var j = 0; j < persons.length; j++) {
					if (persons[j].id == i) {
						return persons[j];
					}
				}
			}
			else {
				return persons;
			}
		},
		familyMembers : function(i) {
			return $filter('filter')(persons, {'familyId':i});
		}
	}
});