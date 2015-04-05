'use strict';

angular.module('auditionApp')

.controller('CastingCtrl', function ($scope, $firebaseArray, $rootScope, $location) {
	if($rootScope.authId !=null)
		console.log($rootScope.authId)
	var pRef = new Firebase("https://auditionr.firebaseio.com/users/" + $rootScope.authId + "/productions")
 	var pArray = $firebaseArray(pRef)


});
