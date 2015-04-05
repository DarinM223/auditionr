'use strict';

angular.module('auditionApp')

.controller('AuditionCtrl', function ($scope, $routeParams, $firebaseArray, $rootScope, $timeout) {

  var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $routeParams.director_id +
    "/productions/" + $routeParams.production_id + "/auditions/" + $routeParams.audition_id);

  $scope.$on('$routeChangeStart', function(next, current) {
    console.log('Route changed!');
    // if ($scope.client) {
    //   $scope.client.disconnect();
    // }
  });

  ref.on("value", function(snapshot) {
    $scope.audition = snapshot.val();

    $timeout(function(){
      function setVideo(elementId, videoElement) {
        var videoParent = document.getElementById(elementId);
        videoParent.innerHTML = "";
        videoParent.appendChild(videoElement);
      }

      $scope.clients = []
      $scope.activeCalls = []
      $('.modal-backdrop').hide();

      $scope.loading = false

      var people = $scope.audition.people
      $scope.remotes = []

      console.log('people', people)

      for(var i=0;i<people.length;i++) {
        if(people[i].id != $rootScope.authId) {

          people[i].iShouldCall = people[i].id < $rootScope.authId

          $scope.remotes.push(people[i])
        }
      }

      $scope.iStore = (function() {
        var iLocal = 0;
        var iRemote = 0;

        return {
          getLocal: function(){return iLocal},
          incrementLocal: function(){iLocal++},

          getRemote: function(){return iRemote},
          incrementRemote: function(){iRemote++}
        }
      })()

      for(i=0;i<$scope.remotes.length;i++) {

        $scope.clients.push(respoke.createClient({
          appId: "dc7663bb-7226-415f-a88b-576527a45d9d",
          baseURL: "https://api.respoke.io",
          developmentMode: true
        }))

        var ci = $scope.clients.length - 1

        var callOptions = {
          // your video
          onLocalMedia: function(evt) {
              setVideo('localVideoSource-' + $scope.iStore.getLocal(), evt.element)
              $scope.iStore.incrementLocal()
          },

          // their video
          onConnect: function(evt) {
              setVideo('remoteVideoSource-' + $scope.iStore.getRemote(), evt.element)
              $scope.iStore.incrementRemote()
          }
        }

        if($scope.remotes[i].iShouldCall) {
          // Call them

          $scope.call = function call(i, options, ci) {
            console.log('clients, ci=' + ci, $scope.clients)
            console.log('remotes, i=' + i, $scope.remotes)

            var recipientEndpoint = $scope.clients[ci].getEndpoint({ id: $scope.remotes[i].id });
            $scope.activeCalls.push(recipientEndpoint.startVideoCall(options));
            console.log('calling...')
          }

          $scope.clients[ci].listen('connect', function() {
            $scope.$apply()
          })

          $scope.clients[ci].connect({
            endpointId: $rootScope.authId
          })


          $timeout(function(data){
            console.log(data)
            $scope.call(data.i, data.callOptions, data.ci)
          }.bind(null, {i: i, callOptions: callOptions, ci: ci}), 5000)




        } else {
          // Wait for their call

          ;(function(callOptions) {
            $scope.clients[ci].listen('call', function(evt) {
              $scope.activeCalls.push(evt.call);
              var activeId = $scope.activeCalls.length;

              if ($scope.activeCalls[activeId].caller !== true) {
                $scope.activeCalls[activeId].answer(callOptions);

                // The hangup event indicates the call is over
                $scope.activeCalls[activeId].listen('hangup', function () {
                    $scope.activeCalls[activeId] = null;
                    $scope.$apply();
                });
              }
              $scope.$apply();

            });

          })(callOptions)



        }
      }


    }, 3000)




  }, function(err) {
    console.log('The read failed: ' + err.code);
  });

  $scope.activeCall = null
  $scope.username = ""
  $scope.friendId = ""

});
