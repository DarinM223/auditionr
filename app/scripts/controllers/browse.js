'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray, $rootScope) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users")
  var pArray = $firebaseArray(pRef)

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};

    console.log(pArray.length);

    for (var i = 0; i < pArray.length; i++) {
      $scope.productions = _.extend($scope.productions, _.map(pArray[i].productions,function(production) {
        return _.extend(production, { user: pArray[i].$id });
      }));
    }

    console.log($scope.productions);

  })

  $scope.signup = function(id) {
    console.log($scope.productions[id])
    $scope.current = $scope.productions[id]
    $scope.id = id
    $('#signup-modal').modal()
  }

  $scope.submit = function() {
    var production = $scope.current
    var charId = $('input:radio[name=character]:checked').val();

    console.log(production)

    var aRef = new Firebase("https://auditionr.firebaseio.com/users/" + production.user +
      "/productions/" + $scope.id + "/auditions");

    var aArray = $firebaseArray(aRef)

    aArray.$loaded().then(function(auditions) {

      var auditions = production.auditions

      function addAudition() {
        auditions.$add({people: [{id: $rootScope.authId, charId: charId}]})
      }

      if(auditions.length === 0) {
        // You're the first one to audition for this play
        addAudition()
      } else {
        // There's others who signed up already
        var found = false

        for(var i=0;i<auditions.length;i++) {
          var audition = auditions[i]
          var has = false

          for(var j=0;j<audition.people.length;j++) {
            if(audition.people[j].charId === charId)
              has = true
          }

          if(!has) {
            // There is a spot in this audition available for you
            audition.people.$add({id: $rootScope.authId, charId: charId})
            break;
          }
        }

        if(!found) {
          // There's no audition with a spot available for you
          addAudition()
        }

      }

    })
  }
});
