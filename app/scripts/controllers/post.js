'use strict';

angular.module('auditionApp')

.controller('PostCtrl', function ($scope, $rootScope, $firebaseArray, $location) {
  if ($rootScope.authId !== null) {
    console.log($rootScope.authId);
	var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $rootScope.authId + "/productions")
	var pArray = $firebaseArray(ref)

	$scope.characters = [""];
    $scope.productionname = "";
    $scope.companyname = "";
    $scope.samplescript = "";
    $scope.description = "";

    $scope.error = null;

	$scope.postClick = function() {
        if ($scope.characters.trim() === '' ||
            $scope.productionname.trim() === '' ||
            $scope.companyname.trim() === '' ||
            $scope.samplescript.trim() === '' ||
            $scope.description.trim() === '') {


        } else {
		  $scope.posts = pArray

          console.log($scope.characters);
          var trimmedArray = $scope.characters.filter(function(elem) { return elem.trim() !== '' });
          console.log(trimmedArray);

		  $scope.posts.$add({
		  	productionName: $scope.productionname,
		  	companyName: $scope.companyname,
		  	characters: trimmedArray,
		  	sampleScript: $scope.samplescript,
		  	descriptionBox: $scope.description
          });
          $location.path('/browse');
        }
	}

	$scope.plusClick = function() {
		// $scope.characters.push($scope.characters.length + 1)
        $scope.characters.push("");
		console.log($scope.characters)

	}
  } else {
    console.log("User id is null!");
  }

});
