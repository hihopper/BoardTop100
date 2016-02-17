'use strict';

angular.module('smsApp').controller('Menu1DestroyCtrl', function($scope, SamplesAPI, usSpinnerService, row) {

  $scope.row = row;

  $scope.close = function() {
    $scope.$dismiss();
  };

  $scope.destroy = function() {
    usSpinnerService.spin('spinner-modal');
    SamplesAPI.remove({ key: $scope.row.key },
                      function(res) {
                        console.log('succ:' + res);
                        $scope.$close();
                      }, function(err) {
                        console.log('fail: ' + err);
                        $scope.error = '삭제에 실패하였습니다. 다시 시도해 주십시오.';
                  //      $scope.$dismiss();
                      }).$promise.finally(function() {
                        usSpinnerService.stop('spinner-modal');
                      });
  };
});
