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

      for (var i = 0; i < $scope.auditions.length; i++) {
        if ($scope.isProperObject($scope.auditions[i].videos)) {

          _.each($scope.auditions[i].videos, function(value, key) {
            var embedding = ZiggeoApi.Embed.embed("#"+key, {paramx: "value-x", paramy: "value-y", video: value});
          });
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
