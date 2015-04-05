'use strict';

angular.module('auditionApp')

.controller('BrowseCtrl', function ($scope, $firebaseArray, $rootScope, $location, $route) {
  var pRef = new Firebase("https://auditionr.firebaseio.com/users")
  var pArray = $firebaseArray(pRef)

  pArray.$loaded().then(function(arr) {
    $scope.productions = {};

    for (var i = 0; i < pArray.length; i++) {
      var newObj = {};
      _.each(pArray[i].productions, function(value, key, obj) {
        if (typeof(key) !== 'undefined') {
          var production = value;
          newObj[key] = _.extend(production, { user: pArray[i].$id });
        }
      });
      console.log(newObj);
      $scope.productions = _.extend($scope.productions, newObj);
    }

    console.log($scope.productions);
  })

  $scope.signup = function(id) {
    $scope.current = $scope.productions[id]
    $('#signup-modal').modal()
  }

  $scope.submit = function() {
    var production = $scope.current
    var charId = $('input:radio[name=character]:checked').val();


    var aRef = new Firebase("https://auditionr.firebaseio.com/users/" + production.user +
      "/productions/" + $scope.current.id + "/auditions");

    var aArray = $firebaseArray(aRef)

    aArray.$loaded().then(function(auditions) {
      console.log(auditions)

      function addAudition() {
        var theData = {people: [{id: $rootScope.authId, charId: charId}]}
        auditions.$add(theData).then(function(p) {
          theData.id = p.key()
          theData.url = '/audition/' + production.user + '/' + $scope.current.id + '/' + p.key()
          theData.production = production
          $scope.goHerePlease = theData.url

          p.set(theData)

          console.log('going to', $scope.goHerePlease)
          $location.path($scope.goHerePlease)
        })
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
            console.log('ci1: ' + audition.people[j].charId + ' ci2: ' + charId)
            if(audition.people[j].charId == charId)
              has = true
          }

          if(!has) {
            // There is a spot in this audition available for you

            console.log('audition.people', audition.people)
            $scope.goHerePlease = audition.url
            audition.people[audition.people.length] = {id: $rootScope.authId, charId: charId}
            auditions.$save(audition)
            found = true

            console.log('going to', $scope.goHerePlease)
            $location.path($scope.goHerePlease)
            $route.reload()
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
