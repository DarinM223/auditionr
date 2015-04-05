'use strict';

angular.module('auditionApp')

.controller('CastingCtrl', function ($scope, $firebaseArray, $firebaseObject, $rootScope, $location, $routeParams) {
	if($rootScope.authId !=null)
		console.log($rootScope.authId)
    var ref = new Firebase("https://auditionr.firebaseio.com/users/" + $routeParams.director_id +
      "/productions/" + $routeParams.production_id + "/auditions");
    var pArray = $firebaseArray(ref)

    $scope.auditions = [];
    $scope.my_production = null;

    var productionObj = $firebaseObject(new Firebase('https://auditionr.firebaseio.com/users/' + $routeParams.director_id + '/productions/' + $routeParams.production_id));

    productionObj.$loaded().then(function(production) {
      $scope.my_production = production;
      console.log($scope.my_production.descriptionBox);
    });

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
            var widthAttr = document.createAttribute('ziggeo-width');
            widthAttr.value = '400px';
            var heightAttr = document.createAttribute('ziggeo-height');
            heightAttr.value = '400px';
            newVideoNode.setAttributeNode(videoAttr);
            newVideoNode.setAttributeNode(widthAttr);
            newVideoNode.setAttributeNode(heightAttr);
            newVideoNode.className = "display: inline-block;";
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
