'use strict';

angular.module('auditionApp')

.controller('AuditionCtrl', function ($scope, $routeParams, $firebaseArray) {

  var ref = new Firebase("https://auditionr.firebaseio.com/auditions");

  $scope.auditions = $firebaseArray(ref);


});
