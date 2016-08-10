(function() {
    'use strict';

    angular.module('team', []);
    angular.module('player', []);
    angular.module('field', []);
    angular.module('5x5playerApp', ['team', 'player', 'field', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: 'partials/home.html'
            });

            $routeProvider.when('/teams', {
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
            });

            $routeProvider.when('/players', {
                templateUrl: 'partials/player/players.html',
                controller: 'PlayerListController',
                controllerAs: 'vm'
            }).when('/players/edit/:playerid', {
                templateUrl: 'partials/player/edit-player.html',
                controller: 'PlayerEditController',
                controllerAs: 'vm',
                resolve: {
                    playerId: ['$route', function($route) {
                        return $route.current.params.playerid;
                    }],
                }
            }).when('/players/new', {
                templateUrl: 'partials/player/create-player.html',
                controller: 'PlayerCreateController',
                controllerAs: 'vm'
            });

            $routeProvider.when('/fields', {
                templateUrl: 'partials/field/fields.html',
                controller: 'FieldListController',
                controllerAs: 'vm'
            }).when('/fields/edit/:fieldid', {
                templateUrl: 'partials/field/edit-field.html',
                controller: 'FieldEditController',
                controllerAs: 'vm',
                resolve: {
                    fieldId: ['$route', function($route) {
                        return $route.current.params.fieldid;
                    }],
                }
            }).when('/fields/new', {
                templateUrl: 'partials/field/create-field.html',
                controller: 'FieldCreateController',
                controllerAs: 'vm'
            });

            $routeProvider.when('/home', {
                templateUrl: 'partials/home.html'
            }).otherwise('/home');
        });
})();
