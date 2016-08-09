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
        var init = function() {
            PlayerService.getAllPlayers().success(function(data) {
                vm.players = data;
            }).error(function(data) {});

            vm.createMsg = angular.copy(PlayerService.createMsg);
            vm.updateMsg = angular.copy(PlayerService.updateMsg);

            PlayerService.createMsg = {};
            PlayerService.updateMsg = {};
        };
        init();
    }

    createCtrl.$inject = ['$location','PlayerService'];

    function createCtrl($location, PlayerService) {
        var vm = this;
        vm.createPlayer = function() {
            console.log(vm.player);
            PlayerService.createPlayer(vm.player).success(function(data){
                PlayerService.createMsg = {
                    success: 'Player with id ' + data._id + ' has been successfully created.'
                };
                $location.path('/players');
            }).error(function(data){
                PlayerService.createMsg = {
                    error: 'An error occurred during ' + vm.player.name + ' player create.'
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
                        error: 'An error occurred during ' + vm.player._id + ' player update.'
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
