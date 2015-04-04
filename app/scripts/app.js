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
    'ngTouch'
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
      .when('/audition', {
        templateUrl: 'views/audition.html',
        contrller: 'AuditionCtrl'
      })
      .when('/casting', {
        templateUrl: 'views/casting.html',
        contrller: 'CastingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
