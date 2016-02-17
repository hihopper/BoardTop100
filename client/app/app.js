'use strict';

angular.module('smsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularSpinner'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
//  .run(function($rootScope) {
//    $rootScope.$on('$stateChangeStart', function(event, next) {

//    });
//  })
;
