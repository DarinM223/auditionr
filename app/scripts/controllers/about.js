'use strict';

/**
 * @ngdoc function
 * @name auditionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the auditionApp
 */
angular.module('auditionApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
