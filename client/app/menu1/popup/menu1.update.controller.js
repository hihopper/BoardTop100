'use strict';

angular.module('smsApp').controller('Menu1UpdateCtrl', function($scope, SamplesAPI, usSpinnerService, row) {

  $scope.sample = row;

  $scope.update = function() {
    usSpinnerService.spin('spinner-modal');
    SamplesAPI.update({ key: $scope.sample.key },
                      { value:$scope.sample.value },
                      function(res) {
                        console.log('succ:' + res);
                        $scope.$close();
                      }, function(err) {
                        console.log(err);
                        $scope.error = '수정에 실패하였습니다. 다시 시도해 주십시오.';
                      }).$promise.finally(function() {
                        usSpinnerService.stop('spinner-modal');
                      });
  };
});
