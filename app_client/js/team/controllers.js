(function(){
  'use strict';
  /* jshint validthis: true */

angular.module('team')
    .controller('TeamListController', listCtrl);

angular.module('team')
    .controller('TeamCreateController', createCtrl);

angular.module('team')
    .controller('TeamEditController', editCtrl);

listCtrl.$inject = [];

function listCtrl() {
    var vm = this;
    var init = function() {
        vm.teams = [];
        vm.teams.push({
            id: 1,
            name: 'Team 1',
            players: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
            city: 'City 1',
            level: 'Beginner'
        });
        vm.teams.push({
            id: 3,
            name: 'Team 3',
            players: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
            city: 'City 1',
            level: 'Expert'
        });
        vm.teams.push({
            id: 2,
            name: 'Team 2',
            players: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
            city: 'City 1',
            level: 'Advanced'
        });
    };
    init();
}

createCtrl.$inject = [];

function createCtrl() {
    var vm = this;
    vm.addTeam = function() {
        console.log(vm.team);
    };

    var init = function() {};
    init();
}

editCtrl.$inject = [];

function editCtrl() {
    var vm = this;
    vm.updateTeam = function() {
        console.log(vm.team);
    };

    var init = function() {
        vm.team = {
            name: 'Team name',
            players: [1, 2, 3, 4, 5],
            location: 'Team location',
            level: 'Beginner'
        };
    };
    init();
}
})();
