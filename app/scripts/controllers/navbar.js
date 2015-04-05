'use strict';

angular.module('auditionApp')

.controller('NavbarCtrl', function ($scope, $rootScope) {
  var ref = new Firebase("https://auditionr.firebaseio.com");
  ref.onAuth(checkLogin);

  function checkLogin(authData) {
    if(authData) {
      $scope.loggedIn = true;
      $scope.name = authData.facebook.displayName;
      $rootScope.authId = authData.uid;

      var user = ref.child('/users/' + authData.uid);
      user.on("value", function(snapshot) {
        if (snapshot.val() === null){
          user.set({
            name: authData.facebook.displayName,
            picture: authData.facebook.cachedUserProfile.picture.data.url
          });
        } else {
          var retrieveUser = snapshot.val();
        }
      });
    } else {
      $scope.loggedIn = false;
    }
  }

  $scope.navInit = function() {
    console.log('navInit')
    var authData = ref.getAuth()

    checkLogin(authData)
  }

  $scope.logout = function() {
    $rootScope.authId = null;
    ref.unauth()
  }
});
