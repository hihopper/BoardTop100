'use strict';

angular.module('smsApp')
  .controller('Menu1Ctrl', function ($scope, $modal, SamplesAPI, usSpinnerService, $window) {

    $scope.data = {
      search: {
        field: 'NO',
        value: ''
      },
      limit: 10,
      maxSize: 10,
      page: 1,
      total: 0,
      rows: [],
      sort: {
        field: 'NO',
        order: 1,
        ngclass: {}
      },
      error: ''
    };

    $scope.lineLimit = function(value) {
      $scope.data.limit = parseInt(value);
      $scope.search();
    };

    $scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
      $scope.data.maxSize = value < 500 ? 5 : 10;
   });

   $scope.searchField = function(field) {
     $scope.data.search.field = field;
   };

    $scope.search = function() {
      usSpinnerService.spin('spinner-main');
      SamplesAPI.get({search: $scope.data.search.field,
                      value: $scope.data.search.value,
                      page: $scope.data.page,
                      limit: $scope.data.limit,
                      sort: $scope.data.sort.field,
                      order: $scope.data.sort.order }, function(result) {
        $scope.data.rows = result.rows;
        $scope.data.total = result.total;
      }, function(err) {
        $scope.data.error = err.statusText;
        $scope.data.rows = [];
        $scope.data.total = 0;
        console.log(err);
      }).$promise.finally( function() {
        usSpinnerService.stop('spinner-main');
      });
    };

    $scope.sort = function(field) {
      if( $scope.data.sort.field === field) {
        $scope.data.sort.order = $scope.data.sort.order * -1;
      }
      else {
        $scope.data.sort.field = field;
      }
      $scope.data.sort.ngclass = {};
      $scope.data.sort.ngclass[field] = $scope.data.sort.order > 0 ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';

      $scope.search();
    };
    $scope.sort($scope.data.sort.field);

    $scope.create = function() {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.create.html',
        controller: 'Menu1CreateCtrl'
      });

      modal.result.then
      ( function() {
        console.log('success');
      },function() {
        console.log('fail');
      });
    };

    $scope.update = function(row) {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.update.html',
        controller: 'Menu1UpdateCtrl',
        resolve: { row: function() { return row; }}
      });

      modal.result.then( function(res) {
        console.log('succ:' + res);
      }, function(err) {
        console.log('fail: ' + err);
      });
    };

    $scope.destroy = function(row) {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.destroy.html',
        controller: 'Menu1DestroyCtrl',
        resolve: { row: function() { return row; }}
      });

      modal.result.then( function(res) {
        console.log('succ:' + res);
      }, function(err) {
        console.log('fail: ' + err);
      });
    };

  });
