(function(){
  'use strict';

  angular.module('team')
    .factory('TeamService', ['$http', function($http){

      var service = {};

      service.getAllTeams = function(){
        return $http.get('/api/teams');
      };

      service.addTeam = function(team){
        return $http.post('/api/teams', team);
      };

      service.getTeamById = function(teamid){
        return $http.get('/api/teams/' + teamid);
      };

      service.updateTeam = function(team){
        return $http.put('/api/teams/' + team._id, team);
      };

      service.createMsg = {};
      service.updateMsg = {};


      return service;
    }]);

})();
