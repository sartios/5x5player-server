(function(){
  'use strict';

  angular.module('5x5playerApp')
    .directive('footerGeneric', footerGeneric);

  function footerGeneric(){
    return {
      restrict: 'EA',
      templateUrl: '/partials/common/footerGeneric.html'
    };
  }
})();
