'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users")
  var pArray = $firebaseArray(pRef)

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};

    console.log(pArray.length);

    for (var i = 0; i < pArray.length; i++) {
      var newObj = {};
      _.each(pArray[i].productions, function(value, key, obj) {
        if (typeof(key) !== 'undefined') {
          var production = value;
          newObj[key] = _.extend(production, { user: pArray[i].$id });
        }
      });
      console.log(newObj);
      $scope.productions = _.extend($scope.productions, newObj);
    }

    console.log($scope.productions);
  })

  $scope.signup = function(id) {
    $scope.current = $scope.productions[id]
    $('#signup-modal').modal()
  }
});
