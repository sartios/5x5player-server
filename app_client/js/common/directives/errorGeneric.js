(function(){
  'use strict';
  angular.module('5x5playerApp')
    .directive('errorGeneric', errorGeneric);

    function errorGeneric(){
      return {
        restrict: 'EA',
        scope: {
          error : '=error'
        },
        templateUrl: '/partials/common/errorGeneric.html'
      };
    }
})();
