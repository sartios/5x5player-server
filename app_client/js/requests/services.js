(function(){
    'use strict';

    angular.module('app.requests')
      .factory('OpponentRequestService', opponentReqService);

    opponentReqService.$inject = ['$http', 'AuthenticationService'];

    function opponentReqService($http, AuthenticationService){
      var service = {};

      service.createRequest = function(opponentRequest){
          console.log('createRequest ', opponentRequest);
        return $http.post('/api/opponent-requests', opponentRequest, {
            headers:{
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        });
      };

      return service;
    }
})();
