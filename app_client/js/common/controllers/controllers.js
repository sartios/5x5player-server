(function(){
  'use strict';
  /* jshint validthis: true */

  angular.module('5x5playerApp')
    .controller('NavigationController', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'AuthenticationService'];

  function navigationCtrl($location, AuthenticationService){
    var navvm = this;

    navvm.logout = function(){
      AuthenticationService.logout();
      $location.path('/');
    };

    var init = function(){
      console.log('navigationCtrl');
      navvm.currentPath = $location.path();
      navvm.isLoggedIn = AuthenticationService.isLoggedIn();
      navvm.currentUser = AuthenticationService.currentUser();
    };
    init();
  }
})();
