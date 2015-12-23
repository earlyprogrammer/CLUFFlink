app.controller("personCtrl", function(directory, $routeParams, $scope) {
	$scope.person = directory.persons($routeParams.personId);
	$scope.family = directory.families($scope.person.familyId);
});