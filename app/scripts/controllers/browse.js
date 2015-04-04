'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users") // p for productions
  var pArray = $firebaseArray(pRef)
  // var pObj = pSync.$asArray()

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};


    for (var i = 0; i < pArray.length; i++) {
      $scope.productions = _.extend($scope.productions, pArray[i].productions);
    }

    console.log($scope.productions);

    // pArray.$add({title: 'Romeo and Juliet' + Math.random(), company: 'LA Central Theater', description: 'A production of the classic play'})
  })
});
