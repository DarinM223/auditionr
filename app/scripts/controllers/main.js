'use strict';

/**
 * @ngdoc function
 * @name auditionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the auditionApp
 */
angular.module('auditionApp')

.controller('MainCtrl', function ($scope, $location, $route) {
  var ref = new Firebase('https://auditionr.firebaseio.com');

  function authDataCallback(authData) {
    console.log('authDataCallback');
    if(authData) {
      console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      console.log('redirecting');
      $location.path('/browse');
      console.log(authData);
    }
  }

  $scope.fbLogin = function() {
    ref.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        $route.reload();
      }
    });
  };

  $scope.checkLogin = function() {
    var authData = ref.getAuth();
    authDataCallback(authData);
  };
});
