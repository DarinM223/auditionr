'use strict';

/**
 * @ngdoc overview
 * @name auditionApp
 * @description
 * # auditionApp
 *
 * Main module of the application.
 */
angular
  .module('auditionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/browse', {
        templateUrl: '/views/browse.html',
        controller: 'BrowseCtrl'
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      })
      .when('/audition/:director_id/:production_id/:audition_id', {
        templateUrl: 'views/audition.html',
        controller: 'AuditionCtrl'
      })
      .when('/casting/:director_id/:production_id', {
        templateUrl: 'views/casting.html',
        controller: 'CastingCtrl'
      })
      .when('/my_casting', {
        templateUrl: 'views/my_casting.html',
        controller: 'MyCastingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
