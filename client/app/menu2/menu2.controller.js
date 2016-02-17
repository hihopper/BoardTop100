'use strict';

angular.module('smsApp')
  .controller('MenuCtrl2', function ($scope, $http) {
    $scope.test = 'TEST';

    $scope.samples = [];

    $http.get('api/samples').then(function(data) {
      $scope.samples = data;
    }, function(err) {
      $scope.test = err.data;
      $scope.samples = [];
    });


  });
