(function() {
    'use strict';

    angular.module('player')
        .factory('PlayerService', ['$http', function($http) {
            var service = {};

            service.getAllPlayers = function() {
                return $http.get('/api/players');
            };

            service.getPlayerById = function(playerId) {
                return $http.get('/api/players/' + playerId);
            };

            service.updatePlayer = function(player) {
                return $http.put('/api/players/' + player._id, player);
            };

            service.createPlayer = function(player) {
                return $http.post('/api/players', player);
            };

            service.deletePlayer = function(playerid) {
                return $http.delete('/api/players/' + playerid);
            };

            service.deleteAll = function() {
                return $http.delete('/api/players');
            };

            service.createMsg = {};
            service.updateMsg = {};

            return service;
        }]);
})();
