(function() {
    'use strict';

    angular.module('team', []);
    angular.module('player', []);
    angular.module('field', []);
    angular.module('5x5playerApp', ['team', 'player', 'field', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: 'partials/home.html'
            }).when('/teams', {
                templateUrl: 'partials/team/teams.html',
                controller: 'TeamListController',
                controllerAs: 'vm'
            }).when('/teams/edit/:teamid', {
                templateUrl: 'partials/team/edit-team.html',
                controller: 'TeamEditController',
                controllerAs: 'vm',
                resolve: {
                    teamId: ['$route', function($route) {
                        return $route.current.params.teamid;
                    }],
                }
            }).when('/teams/new', {
                templateUrl: 'partials/team/create-team.html',
                controller: 'TeamCreateController',
                controllerAs: 'vm'
            }).when('/players', {
                templateUrl: 'partials/player/players.html',
                controller: 'PlayerListController',
                controllerAs: 'vm'
            }).when('/players/edit/:playerid', {
                templateUrl: 'partials/player/edit-player.html',
                controller: 'PlayerEditController',
                controllerAs: 'vm',
                resolve: {
                    playerId: ['$route', function($route){
                        return $route.current.params.playerid;
                    }],
                }
            }).when('/home', {
                templateUrl: 'partials/home.html'
            }).otherwise('/home');
        });

})();
