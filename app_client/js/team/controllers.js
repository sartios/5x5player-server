(function() {
    'use strict';
    /* jshint validthis: true */

    angular.module('team')
        .controller('TeamListController', listCtrl);

    angular.module('team')
        .controller('TeamCreateController', createCtrl);

    angular.module('team')
        .controller('TeamEditController', editCtrl);

    listCtrl.$inject = ['$scope', 'TeamService'];

    function listCtrl($scope, TeamService) {
        var vm = this;

        vm.deleteTeam = function(teamid) {
            TeamService.deleteTeam(teamid).success(function(data) {
                vm.deleteMsg = {
                    success: 'Team with id ' + teamid + ' has been deleted successfully'
                };
                initTeams();
            }).error(function(data) {
                vm.deleteMsg = {
                    error: data.message
                };
            });
        };

        vm.deleteAll = function() {
            TeamService.deleteAll().success(function(data) {
                vm.deleteMsg = {
                    success: 'All teams have been deleted successfully'
                };
                initTeams();
            }).error(function(data) {
                vm.deleteMsg = {
                    error: data.message
                };
            });
        };

        var initTeams = function() {
            vm.teams = [];
            TeamService.getAllTeams()
                .success(function(data) {
                    vm.teams = data;
                    vm.total = vm.teams.length;
                })
                .error(function(data) {
                    vm.error = data.message;
                });
        };

        var init = function() {
            initTeams();
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
                .success(function(data) {
                    TeamService.createMsg = {
                        success: 'A team with id ' + data._id + ' has been created'
                    };
                    $location.path('/teams');
                })
                .error(function(data) {
                    TeamService.createMsg = {
                        error: data.message
                    };
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
                .success(function(data) {
                    TeamService.updateMsg = {
                        success: 'Team with ' + data._id + ' have been updated successfully'
                    };
                    $location.path('/teams');
                })
                .error(function(data) {
                    TeamService.updateMsg = {
                        error: data.message
                    };
                    $location.path('/teams');
                });
        };

        var init = function() {
            TeamService.getTeamById(teamId)
                .success(function(data) {
                    vm.team = data;
                })
                .error(function(data) {
                    vm.errorMsg = 'No team exists with ' + teamId + ' ID';
                });
        };
        init();
    }

})();
