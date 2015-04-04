'use strict';

angular.module('auditionApp')

.controller('NavbarCtrl', function ($scope) {
  var ref = new Firebase("https://auditionr.firebaseio.com");

  $scope.navInit = function() {
    console.log('navInit')
    var authData = ref.getAuth()

    if(authData) {
      $scope.loggedIn = true;
      // $scope.name = auth
      console.log(authData)
    } else {
      $scope.loggedIn = false;
    }
  }
});
