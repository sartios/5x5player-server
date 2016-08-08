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

            service.createMsg = {};
            service.updateMsg = {};

            return service;
        }]);
})();
