'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users")
  var pArray = $firebaseArray(pRef)

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};

    for (var i = 0; i < pArray.length; i++) {
      $scope.productions = _.extend($scope.productions, pArray[i].productions);
    }

    console.log($scope.productions);

  })

  $scope.signup = function(id) {
    console.log($scope.productions[id])
    $scope.current = $scope.productions[id]
    $('#signup-modal').modal()
  }
});
