(function() {
    'use strict';

    angular.module('app.requests')
        .factory('OpponentRequestService', opponentReqService);

    angular.module('app.requests')
        .factory('PlayerRequestService', playerReqService);


    function opponentReqService($http, AuthenticationService) {
        var service = {};
        var config = {
            headers: {
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.getRequests = function(){
            return $http.get('/api/opponent-requests', config);
        };

        service.getRequestById = function(requestid){
            return $http.get('/api/opponent-requests/' + requestid, config);
        };

        service.createRequest = function(opponentRequest) {
            return $http.post('/api/opponent-requests', opponentRequest, config);
        };

        service.updateRequest = function(requestid, opponentRequest){
            return $http.put('/api/opponent-requests/' + requestid, opponentRequest);
        };

        service.deleteRequests = function(){
            return $http.delete('/api/opponent-requests/', config);
        };

        service.deleteRequest = function(requestid){
            return $http.delete('/api/opponent-requests/' + requestid, config);
        };

        return service;
    }
    opponentReqService.$inject = ['$http', 'AuthenticationService'];

    function playerReqService($http, AuthenticationService){
        var service = {};
        var config = {
            headers: {
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.getRequests = function(){
            return $http.get('/api/player-requests', config);
        };

        service.getRequestById = function(requestid){
            return $http.get('/api/player-requests/' + requestid, config);
        };

        service.createRequest = function(playerRequest){
            return $http.post('/api/player-requests', playerRequest, config);
        };

        service.updateRequest = function(requestid, playerRequest){
            return $http.put('/api/player-requests/' + requestid, playerRequest, config);
        };

        service.deleteRequests = function(){
            return $http.delete('/api/player-requests', config);
        };

        service.deleteRequest = function(requestid){
            return $http.delete('/api/player-requests/' + requestid, config);
        };

        return service;
    }

    playerReqService.$inject = ['$http', 'AuthenticationService'];

})();
