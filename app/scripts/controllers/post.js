'use strict';

angular.module('auditionApp')

.controller('PostCtrl', function ($scope, $rootScope, $firebaseArray, $location) {
  if ($rootScope.authId !== null) {
    console.log($rootScope.authId);
	var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $rootScope.authId + "/productions")
	var pArray = $firebaseArray(ref)

	$scope.characters = [1]

	$scope.postClick = function() {
		$scope.posts = pArray

		$scope.posts.$add({
			productionName: $scope.productionname,
			companyName: $scope.companyname,
			characterName: $scope.charactername,
			sampleScript: $scope.samplescript,
			descriptionBox: $scope.description});
        $location.path('/browse');
	}

	$scope.plusClick = function() {
		$scope.characters.push($scope.characters.length + 1)
		console.log($scope.characters)

	}
  } else {
    console.log("User id is null!");
  }

});
