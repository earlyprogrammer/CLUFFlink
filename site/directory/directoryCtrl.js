app.controller("directoryCtrl", function(directory, $scope, $filter, $location) {
	
	$scope.families = directory.families();
	$scope.people = directory.persons();
	
	$scope.selectFamily = function(id) {
		$location.path("family/" + id);
	}
	
	$scope.selectPerson = function(id) {
		$location.path("person/" + id);
	}
	
	$scope.filterFamilies = function(value) {
		var filteredPeople = $filter('filter')($scope.people, $scope.searchText);
		for (person in filteredPeople) {
			if (filteredPeople[person].familyId == value.id)
				return true;
		}
		return false;
	}
});