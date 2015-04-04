'use strict';

angular.module('auditionApp')

.controller('PostCtrl', function ($scope, $firebaseArray) {
	var ref = new Firebase("https://auditionr.firebaseio.com/posts")
	console.log("HELLO WORLD!!!!")
	var pArray = $firebaseArray(ref)

	$scope.postClick = function() {
		$scope.posts = pArray
		console.log($scope.productionname)
		console.log($scope.companyname)
		console.log($scope.charactername)
		console.log($scope.samplescript)

		$scope.posts.$add({
			productionName: $scope.productionname,
			companyName: $scope.companyname,
			characterName: $scope.characterName,
			sampleScript: $scope.samplescript});
	}

});
