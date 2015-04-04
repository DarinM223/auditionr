'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/productions") // p for productions
  var pArray = $firebaseArray(pRef)
  // var pObj = pSync.$asArray()

  pArray.$loaded().then(function(arr) {

    $scope.productions = pArray

    console.log(pArray)

    // pArray.$add({title: 'Romeo and Juliet' + Math.random(), company: 'LA Central Theater', description: 'A production of the classic play'})
  })

  $scope.signup = function(i) {
    console.log(pArray[i])
    $scope.current = pArray[i]
    $('#signup-modal').modal()
  }
});
