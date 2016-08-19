(function(){
  'use strict';
  /* jshint validthis: true */

  angular.module('5x5playerApp')
    .controller('HomeController', homeCtrl);


  function homeCtrl(AuthenticationService){
    var vm = this;

    var init = function(){
      if(AuthenticationService.isLoggedIn()){
        vm.user = AuthenticationService.currentUser();
      }else{
        vm.user = {name: 'Guest'};
      }
    };

    init();
  }

homeCtrl.$inject = ['AuthenticationService'];

})();
