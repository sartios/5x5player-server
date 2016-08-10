(function() {
    'use strict';
    /* jshint validthis: true */

    angular.module('player')
        .controller('PlayerListController', listCtrl);
    angular.module('player')
        .controller('PlayerEditController', editCtrl);
    angular.module('player')
        .controller('PlayerCreateController', createCtrl);

    listCtrl.$inject = ['PlayerService'];

    function listCtrl(PlayerService) {
        var vm = this;
        vm.players = [];

        vm.deletePlayer = function(playerid) {
            PlayerService.deletePlayer(playerid).success(function(data) {
                vm.deleteMsg = {
                    success: 'Player with id ' + playerid + ' has been deleted successfully'
                };
                initPlayers();
            }).error(function(data) {
                vm.deleteMsg = {
                    error: data.message
                };
            });
        };

        vm.deleteAll = function() {
            PlayerService.deleteAll().success(function(data) {
                vm.deleteMsg = {
                    success: 'All players have been deleted successfully'
                };
                initPlayers();
            }).error(function(data) {
                vm.deleteMsg = {
                    error: data.message
                };
            });
        };

        var initPlayers = function() {
            PlayerService.getAllPlayers().success(function(data) {
                vm.players = data;
                vm.total = vm.players.length;
            }).error(function(data) {});
        };

        var init = function() {
            initPlayers();

            vm.createMsg = angular.copy(PlayerService.createMsg);
            vm.updateMsg = angular.copy(PlayerService.updateMsg);

            PlayerService.createMsg = {};
            PlayerService.updateMsg = {};
        };
        init();
    }

    createCtrl.$inject = ['$location', 'PlayerService'];

    function createCtrl($location, PlayerService) {
        var vm = this;
        vm.createPlayer = function() {
            console.log(vm.player);
            PlayerService.createPlayer(vm.player).success(function(data) {
                PlayerService.createMsg = {
                    success: 'Player with id ' + data._id + ' has been successfully created.'
                };
                $location.path('/players');
            }).error(function(data) {
                PlayerService.createMsg = {
                    error: data.message
                };
                $location.path('/players');
            });
        };

        var init = function() {};
        init();
    }

    editCtrl.$inject = ['playerId', '$location', 'PlayerService'];

    function editCtrl(playerId, $location, PlayerService) {
        var vm = this;
        vm.updatePlayer = function() {
            console.log(vm.player);
            PlayerService.updatePlayer(vm.player)
                .success(function(data) {
                    PlayerService.updateMsg = {
                        success: 'Player with id ' + data._id + ' has been successfully updated.'
                    };
                    $location.path('/players');
                })
                .error(function(data) {
                    PlayerService.updateMsg = {
                        error: data.message
                    };
                    $location.path('/players');
                });
        };

        var init = function() {
            PlayerService.getPlayerById(playerId)
                .success(function(data) {
                    vm.player = data;
                })
                .error(function(data) {

                });
        };
        init();
    }
})();
