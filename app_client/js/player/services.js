(function() {
    'use strict';

    angular.module('player')
        .factory('PlayerService', playerService);

    playerService.$inject = ['$http', 'AuthenticationService'];

    function playerService($http, AuthenticationService) {
        var service = {};
        var config = {
            headers: {
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.getAllPlayers = function() {
            return $http.get('/api/players', config);
        };

        service.getPlayerById = function(playerId) {
            return $http.get('/api/players/' + playerId, config);
        };

        service.updatePlayer = function(player) {
            return $http.put('/api/players/' + player._id, player, config);
        };

        service.createPlayer = function(player) {
            return $http.post('/api/players', player, config);
        };

        service.deletePlayer = function(playerid) {
            return $http.delete('/api/players/' + playerid, config);
        };

        service.deleteAll = function() {
            return $http.delete('/api/players', config);
        };

        service.createMsg = {};
        service.updateMsg = {};

        return service;

    }
})();
