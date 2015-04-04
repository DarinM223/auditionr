'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users")
  var pArray = $firebaseArray(pRef)

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};

    for (var i = 0; i < pArray.length; i++) {
      $scope.productions = _.extend($scope.productions, _.map(pArray[i].productions,function(production) {
        console.log(pArray[i]);
        return _.extend(production, { user: pArray[i].$id });
      }));
    }

    console.log($scope.productions);

  })

  $scope.signup = function(id) {
    console.log($scope.productions[id])
    $scope.current = $scope.productions[id]
    $('#signup-modal').modal()
  }
});
