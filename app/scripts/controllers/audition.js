'use strict';

angular.module('auditionApp')

.controller('AuditionCtrl', function ($scope, $routeParams, $firebaseArray, $rootScope, $timeout) {

  var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $routeParams.director_id +
    "/productions/" + $routeParams.production_id + "/auditions/" + $routeParams.audition_id);

  $scope.$on('$routeChangeStart', function(next, current) { 
    console.log('Route changed!');
    if ($scope.client) {
      $scope.client.disconnect();
    }
  });

  ref.on("value", function(snapshot) {
    $scope.audition = snapshot.val();

    $timeout(function(){
      function setVideo(elementId, videoElement) {
        var videoParent = document.getElementById(elementId);
        videoParent.innerHTML = "";
        videoParent.appendChild(videoElement);
      }

      $('.modal-backdrop').hide();

      $scope.client = respoke.createClient({
        appId: "dc7663bb-7226-415f-a88b-576527a45d9d",
        baseURL: "https://api.respoke.io",
        developmentMode: true
      })

      $scope.client.listen('connect', function() {
        $scope.$apply()
      })

      $scope.client.connect({
        endpointId: $rootScope.authId
      })

      $scope.loading = false

      var callOptions = {
        // your video
        onLocalMedia: function(evt) {
            setVideo('localVideoSource', evt.element)
        },

        // their video
        onConnect: function(evt) {
            setVideo('remoteVideoSource', evt.element)
        }
      };

      $scope.call = function() {
        var recipientEndpoint = $scope.client.getEndpoint({ id: $scope.friendId });
        $scope.activeCall = recipientEndpoint.startVideoCall(callOptions);
        console.log('calling...')
      }

      $scope.client.listen('call', function(evt) {
        $scope.activeCall = evt.call;


        if ($scope.activeCall.caller !== true) {
          $scope.activeCall.answer(callOptions);

          // The hangup event indicates the call is over
          $scope.activeCall.listen('hangup', function () {
              $scope.activeCall = null;
              $scope.$apply();
          });
        }
        $scope.$apply();

      });

      var people = $scope.audition.people
      console.log('people', people)
      var iShouldCall = true
      for(var i=0;i<people.length;i++) {
        if(people[i].id != $rootScope.authId) {
          $scope.friendId = people[i].id
          if(i===0)
            iShouldCall = false
        }
      }

      console.log('I will call ' + $scope.friendId, iShouldCall)
      if(iShouldCall) {
        $timeout(function(){}, 5000)

        .then(function() {
          $scope.call()
        })

      }

    }, 3000)




  }, function(err) {
    console.log('The read failed: ' + err.code);
  });

  $scope.activeCall = null
  $scope.username = ""
  $scope.friendId = ""

});
