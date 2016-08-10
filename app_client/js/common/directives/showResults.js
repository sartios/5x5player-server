(function(){
  'use strict';
  angular.module('5x5playerApp')
    .directive('showResults', showResults);

    function showResults(){
      return {
        restrict: 'EA',
        scope: {
          resultsNumber : "=results"
        },
        templateUrl: '/partials/common/showResults.html'
      };
    }
})();
