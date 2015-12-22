app.controller("directoryCtrl", function(directory, $scope, $filter) {
	
	$scope.families = directory.families();
	$scope.people = directory.persons();
	
	
	$scope.filterFamilies = function(value, index) {
		var filteredPeople = $filter('filter')($scope.people, $scope.searchText);
		for (person in filteredPeople) {
			if (filteredPeople[person].familyIndex == index)
				return true;
		}
		return false;
	}
});