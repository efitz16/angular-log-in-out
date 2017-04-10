myApp.controller('HomeController', ['$scope', function($scope) {
  $scope.suggestion = function() {
  	if (!$scope.user.firstname || $scope.user.firstname === "") {
  	  return;
  	}
    $scope.message = 'Hello ' + $scope.user.firstname;
  }
}]);
