app.controller("familyCtrl", function(directory, $scope, $routeParams) {
	$scope.family = directory.families($routeParams.familyId);
	$scope.members = directory.familyMembers($routeParams.familyId);
});