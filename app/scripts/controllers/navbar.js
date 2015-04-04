'use strict';

angular.module('auditionApp')

.controller('NavbarCtrl', function ($scope) {
  var ref = new Firebase("https://auditionr.firebaseio.com");
  ref.onAuth(checkLogin);

  function checkLogin(authData) {
    if(authData) {
      $scope.loggedIn = true;
      $scope.name = authData.facebook.displayName;
      console.log(authData)
    } else {
      $scope.loggedIn = false;
    }
  }

  $scope.navInit = function() {
    console.log('navInit')
    var authData = ref.getAuth()

    checkLogin(authData)

    // if(authData) {
    //   $scope.loggedIn = true;
    //   $scope.name = authData.facebook.displayName;
    //   console.log(authData)
    // } else {
    //   $scope.loggedIn = false;
    // }
  }

  $scope.logout = function() {
    ref.unauth()
  }
});
