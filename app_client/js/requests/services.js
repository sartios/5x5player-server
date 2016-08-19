(function() {
    'use strict';

    angular.module('app.requests')
        .factory('OpponentRequestService', opponentReqService);


    function opponentReqService($http, AuthenticationService) {
        var service = {};
        var config = {
            headers: {
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.createRequest = function(opponentRequest) {
            return $http.post('/api/opponent-requests', opponentRequest, config);
        };

        service.getRequests = function(){
            return $http.get('/api/opponent-requests', config);
        };

        return service;
    }
    opponentReqService.$inject = ['$http', 'AuthenticationService'];

})();
