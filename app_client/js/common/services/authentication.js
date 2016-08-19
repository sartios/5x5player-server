(function(){
  'use strict';

  angular.module('5x5playerApp')
    .factory('AuthenticationService', authenticationService);

  authenticationService.$inject = ['$window', '$http'];

  function authenticationService($window, $http){
    var service = {};

    service.saveToken = function(token){
      $window.localStorage['5x5player-token'] = token;
    };

    service.getToken = function(){
      return $window.localStorage['5x5player-token'];
    };

    service.register = function(user){
      return $http.post('/api/register', user).success(function(data){
        service.saveToken(data.token);
      });
    };

    service.login = function(user){
      return $http.post('/api/login', user).success(function(data){
        service.saveToken(data.token);
      });
    };

    service.logout = function(){
      $window.localStorage.removeItem('5x5player-token');
    };

    service.isLoggedIn = function(){
      var token = service.getToken();
      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      }else{
        return false;
      }
    };

    service.currentUser = function(){
      if(service.isLoggedIn()){
        var token = service.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    return service;
  }

})();
