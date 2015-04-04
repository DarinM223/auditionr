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

      var user = ref.child('/users/' + authData.uid);
      user.on("value", function(snapshot) {
        if (snapshot.val() === null){
          user.set({
            name: authData.facebook.displayName,
            picture: authData.facebook.cachedUserProfile.picture.data.url
          });
        } else {
          var retrieveUser = snapshot.val();
          console.log(snapshot.val());
          console.log('Already retrieved user name: ' + retrieveUser.name + ' picture url: ' + retrieveUser.picture);
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
    ref.unauth()
  }
});
