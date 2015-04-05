'use strict';

angular.module('auditionApp')

.controller('CastingCtrl', function ($scope, $firebaseArray, $firebaseObject, $rootScope, $location, $routeParams) {
	if($rootScope.authId !=null)
		console.log($rootScope.authId)
    var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $routeParams.director_id +
      "/productions/" + $routeParams.production_id + "/auditions");
    var pArray = $firebaseArray(ref)

    $scope.auditions = [];

    pArray.$loaded().then(function(auditions) {
      $scope.auditions = auditions;
      console.log(auditions);

      var videosNode = document.getElementById('videos');
      for (var Akey in $scope.auditions) {
        var audition = $scope.auditions[Akey];
        if ($scope.isProperObject(audition)) {
          for (var key in audition.videos) {
            var value = audition.videos[key];
            var newVideoNode = document.createElement('ziggeo');
            var videoAttr = document.createAttribute('ziggeo-video');
            videoAttr.value = value;
            newVideoNode.setAttributeNode(videoAttr);
            videosNode.appendChild(newVideoNode);
            var breakNode = document.createElement('br');
            videosNode.appendChild(breakNode);
          }
        }
      }
    });

    $scope.isProperObject = function(obj) {
      return (typeof(obj) !== 'undefined' && obj !== null);
    };

    $scope.ziggeo_video = function(video_id) {
      return $compile("<ziggeo ziggeo-video='" + video_id + "'></ziggeo>")(scope);
    }
});
