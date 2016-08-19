(function(){
  'use strict';
    /* jshint validthis: true */

  angular.module('5x5playerApp')
    .controller('RegisterController', registerCtrl);

  angular.module('5x5playerApp')
    .controller('LoginController', loginCtrl);

  function loginCtrl($location, AuthenticationService){
    var vm = this;

    vm.credentials = {
      email: "",
      password: ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function(){
      vm.formError = "";
      if(!vm.credentials.email || !vm.credentials.password){
        vm.formError = "All fields required, please try again";
        return false;
      }else{
        vm.doLogin();
      }
    };

    vm.doLogin = function(){
      vm.formmError = "";
      AuthenticationService
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null);
          $location.path(vm.returnPage);
        });
    };


  }



  function registerCtrl($location, AuthenticationService){
    var vm = this;

    vm.onSubmit = function(){
      if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
        vm.formError = "All fields required, please try again";
        return false;
      }else{
        vm.doRegister();
      }
    };

    vm.doRegister = function(){
      vm.formError = "";
      AuthenticationService.register(vm.credentials)
      .error(function(err){
        vm.formError = err;
      })
      .then(function(){
        $location.search('page', null);
        $location.path(vm.returnPage);
      });
    };

    var init = function(){
      vm.credentials = {
        name: "",
        email: "",
        password: ""
      };

      vm.returnPage = $location.search().page || '/';
    };
    init();
  }

  loginCtrl.$inject = ['$location', 'AuthenticationService'];
  registerCtrl.$inject = ['$location', 'AuthenticationService'];
})();
