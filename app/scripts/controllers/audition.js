'use strict';

angular.module('auditionApp')

.controller('AuditionCtrl', function ($scope, $routeParams, $firebaseArray) {

  var ref = new Firebase("https://auditionr.firebaseio.com/users/facebook:" + $routeParams.director_id +
    "/productions/" + $routeParams.production_id + "/auditions/" + $routeParams.audition_id);

  ref.on("value", function(snapshot) {
    $scope.audition = snapshot.val();
    console.log($scope.audition);
  }, function(err) {
    console.log('The read failed: ' + err.code);
  });

  // $scope.activeCall
});
