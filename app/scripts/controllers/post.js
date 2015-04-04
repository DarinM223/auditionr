'use strict';

angular.module('auditionApp')

.controller('PostCtrl', function ($scope, $firebaseArray) {
	var ref = new Firebase("https://auditionr.firebaseio.com/posts")
	console.log("HELLO WORLD!!!!")
	var pArray = $firebaseArray(ref)

	$scope.postClick = function() {
		$scope.posts = pArray

		// console.log("This is " + pArray)
	}

});
