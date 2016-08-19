(function(){
  'use strict';

  angular.module('5x5playerApp')
    .controller('RootController', rootController);

  rootController.$inject = ['$scope', '$location', 'AuthenticationService'];

  function rootController($scope, $location, AuthenticationService){

    var listenOnPathChanges = function(){
      $scope.$on('$routeChangeStart', function(angularEvent, newUrl){
        if(newUrl.requireAuth && !AuthenticationService.isLoggedIn()){
          $location.path('/home');
        }
      });
    };

    var init = function(){
      listenOnPathChanges();
    };

    init();
  }

})();
