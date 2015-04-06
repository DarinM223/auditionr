'use strict';

angular.module('auditionApp')

.controller('MyCastingCtrl', function ($scope, $rootScope, $firebaseObject) {
  if($rootScope.authId !== null) {
    console.log($rootScope.authId);
  }
  var pRef = new Firebase("https://auditionr.firebaseio.com/users/" + $rootScope.authId + "/productions");
  var pArray = $firebaseObject(pRef);
  
  $scope.error = null;
  $scope.productions = {};
  
  pArray.$loaded().then(function(arr) {
    var newObj = {};
    _.each(pArray, function(value, key, obj) {
      if (typeof(key) !== 'undefined') {
        var production = value;
        newObj[key] = _.extend(production, { user: $rootScope.authId });
      }
    });
    $scope.productions = _.extend($scope.productions, newObj);
    console.log($scope.productions);
  });
});
