'use strict';

angular.module('smsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menu2', {
        url: '/menu2',
        templateUrl: 'app/menu2/menu2.html',
        controller: 'MenuCtrl2'
      });
  });
