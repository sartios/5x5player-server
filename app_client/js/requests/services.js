(function() {
    'use strict';

    angular.module('app.requests')
        .factory('OpponentRequestService', opponentReqService);

    opponentReqService.$inject = ['$http', 'AuthenticationService'];

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

        return service;
    }
})();
