(function(){
  'use strict';
  /* jshint validthis: true */

  angular.module('team')
      .controller('TeamListController', listCtrl);

  angular.module('team')
      .controller('TeamCreateController', createCtrl);

  angular.module('team')
      .controller('TeamEditController', editCtrl);

listCtrl.$inject = ['$scope','TeamService'];

function listCtrl($scope, TeamService) {
    var vm = this;
    var init = function() {
      vm.teams = [];
      TeamService.getAllTeams()
      .success(function(data){
        vm.teams = data;
        console.log('Found ' + vm.teams.length + ' teams');
      })
      .error(function(data){
        vm.error = 'An error occured during teams fetching';
      });

      vm.updateMsg = angular.copy(TeamService.updateMsg);
      vm.createMsg = angular.copy(TeamService.createMsg);
      TeamService.updateMsg = {};
      TeamService.createMsg = {};
    };
    init();
}

createCtrl.$inject = ['TeamService', '$location'];

function createCtrl(TeamService, $location) {
    var vm = this;

    vm.addTeam = function() {
      console.log(vm.team);
      TeamService.addTeam(vm.team)
      .success(function(data){
        TeamService.createMsg = {success: 'A team with id ' + data._id + ' has been created'};
        $location.path('/teams');
      })
      .error(function(data){
        TeamService.createMsg = {error: 'An error occured during team creation'};
        $location.path('/teams');
      });
    };

    var init = function() {};
    init();
}

editCtrl.$inject = ['teamId', '$location', 'TeamService'];

function editCtrl(teamId, $location, TeamService) {
    var vm = this;
    vm.updateTeam = function() {
      console.log(vm.team);
      TeamService.updateTeam(vm.team)
      .success(function(data){
        TeamService.updateMsg = {success: 'Team with ' + data._id + ' have been updated successfully'};
        $location.path('/teams');
      })
      .error(function(data){
        TeamService.updateMsg = {error: 'An error occured during team ' + teamId + ' update process'};
        $location.path('/teams');
      });
    };

    var init = function() {
        TeamService.getTeamById(teamId)
        .success(function(data){
          vm.team = data;
        })
        .error(function(data){
          vm.errorMsg = 'No team exists with ' + teamId + ' ID';
        });
    };
    init();
}

})();
