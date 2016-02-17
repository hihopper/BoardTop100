'use strict';

angular.module('smsApp').controller('Menu1CreateCtrl', function($scope, SamplesAPI, usSpinnerService) {

  $scope.sample = {};

  $scope.create = function() {

    usSpinnerService.spin('spinner-modal');
    SamplesAPI.save({ key: $scope.sample.key,
                      value:$scope.sample.value
                    }, function(result){
                      console.log(result);
                      $scope.$close();
                    }, function(err){
                      console.log(err);
                      $scope.$dismiss();
                    }).$promise.finally(function() {
                      usSpinnerService.stop('spinner-modal');
                    });
  };
});
