(function(){
  'use strict';

  angular.module('5x5playerApp')
    .directive('navigationGeneric', navigationGeneric);

  function navigationGeneric(){
    return {
      restrict: 'EA',
      templateUrl: 'partials/common/navigationGeneric.html'
    };
  }
})();
