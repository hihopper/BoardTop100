'use strict';

angular.module('smsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menu1', {
        url: '/menu1',
        templateUrl: 'app/menu1/menu1.html',
        controller: 'Menu1Ctrl'
      });
  });
