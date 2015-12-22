app.controller("rootCtrl", function($scope, $location) {
	
	$scope.changeView = function(newPath) {
		$location.path(newPath);
	}
	
});