(function() {
    'use strict';

    angular.module('team')
        .factory('TeamService', teamService);

    teamService.$inject = ['$http', 'AuthenticationService'];

    function teamService($http, AuthenticationService) {

        var service = {};
        var config = {
            headers:{
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.getAllTeams = function() {
            return $http.get('/api/teams', config);
        };

        service.addTeam = function(team) {
            return $http.post('/api/teams', team, config);
        };

        service.getTeamById = function(teamid) {
            return $http.get('/api/teams/' + teamid, config);
        };

        service.updateTeam = function(team) {
            return $http.put('/api/teams/' + team._id, team, config);
        };

        service.deleteTeam = function(teamid) {
            return $http.delete('/api/teams/' + teamid, config);
        };

        service.deleteAll = function() {
            return $http.delete('/api/teams', config);
        };

        service.createMsg = {};
        service.updateMsg = {};

        return service;
    }

})();
