'use strict';

angular.module('smsApp')
  .controller('NavbarCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.isCollapsed = true;

    $scope.isActive = function(menu) {
      return $state.includes(menu);
    };

    $scope.menuClick = function() {
      $scope.isCollapsed = true;
    };
  }]);
