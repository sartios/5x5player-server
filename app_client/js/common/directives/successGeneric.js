(function(){
  'use strict';
  angular.module('5x5playerApp')
    .directive('successGeneric', successGeneric);

    function successGeneric(){
      return {
        restrict: 'EA',
        scope: {
          success : '=success'
        },
        templateUrl: '/partials/common/successGeneric.html'
      };
    }
})();
