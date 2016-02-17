'use strict';

angular.module('smsApp').factory('SamplesAPI', function($resource) {
  return $resource('api/board/:no', {}, {
    update: { method: 'PUT'}
  });
});
