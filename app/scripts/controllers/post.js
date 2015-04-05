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
    $scope.numChars = 0;

    $scope.error = null;

    $scope.resetError = function() {
      $scope.error = null;
    };

	$scope.postClick = function() {
        if ($scope.productionname.trim() === '' ||
            $scope.companyname.trim() === '' ||
            $scope.samplescript.trim() === '' ||
            $scope.description.trim() === '') {

          $scope.error = "You cannot leave any of the fields empty!";
        } else if ($scope.productionname.length > 30 || $scope.description.length > 500) {
          $scope.error = "You can only enter at most 30 characters for the production name and at most 70 characters for the description";
        } else {
		  $scope.posts = pArray

          console.log($scope.characters);
          var trimmedArray = $scope.characters.filter(function(elem) { return elem.trim() !== '' });
          console.log(trimmedArray);

      var theData = {
		  	productionName: $scope.productionname,
		  	companyName: $scope.companyname,
		  	characters: trimmedArray,
		  	sampleScript: $scope.samplescript,
		  	descriptionBox: $scope.description
      }
		  $scope.posts.$add(theData).then(function(p) {
        console.log(p)
        p.set(_.extend(theData, {id: p.key()}))
        // p.$add({id: p.key()})
      })


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
