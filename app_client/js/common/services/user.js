(function(){
  'use strict';

  angular.module('5x5playerApp')
    .factory('UserService', userService);


  function userService($http, AuthenticationService){
    var service = {};
    var config = {
      headers:{
        Authorization: 'Bearer ' + AuthenticationService.getToken()
      }
    };

    service.getTeams = function(){
      return $http.get('/api/user/teams', config);
    };

    return service;
  }

  userService.$inject = ['$http', 'AuthenticationService'];

})();
