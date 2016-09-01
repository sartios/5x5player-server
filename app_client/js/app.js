(function() {
    'use strict';

    angular.module('team', []);
    angular.module('player', []);
    angular.module('field', []);
    angular.module('app.requests', []);
    angular.module('5x5playerApp', ['team', 'player', 'field', 'app.requests',
     'ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

            $routeProvider.when('/teams', {
                templateUrl: 'partials/team/teams.html',
                controller: 'TeamListController',
                controllerAs: 'vm',
                requireAuth: true
            }).when('/teams/edit/:teamid', {
                templateUrl: 'partials/team/edit-team.html',
                controller: 'TeamEditController',
                controllerAs: 'vm',
                resolve: {
                    teamId: ['$route', function($route) {
                        return $route.current.params.teamid;
                    }],
                },
                requireAuth: true
            }).when('/teams/new', {
                templateUrl: 'partials/team/create-team.html',
                controller: 'TeamCreateController',
                controllerAs: 'vm',
                requireAuth: true
            });

            $routeProvider.when('/players', {
                templateUrl: 'partials/player/players.html',
                controller: 'PlayerListController',
                controllerAs: 'vm',
                requireAuth: true
            }).when('/players/edit/:playerid', {
                templateUrl: 'partials/player/edit-player.html',
                controller: 'PlayerEditController',
                controllerAs: 'vm',
                resolve: {
                    playerId: ['$route', function($route) {
                        return $route.current.params.playerid;
                    }],
                },
                requireAuth: true
            }).when('/players/new', {
                templateUrl: 'partials/player/create-player.html',
                controller: 'PlayerCreateController',
                controllerAs: 'vm',
                requireAuth: true
            });

            $routeProvider.when('/fields', {
                templateUrl: 'partials/field/fields.html',
                controller: 'FieldListController',
                controllerAs: 'vm',
                requireAuth: true
            }).when('/fields/edit/:fieldid', {
                templateUrl: 'partials/field/edit-field.html',
                controller: 'FieldEditController',
                controllerAs: 'vm',
                resolve: {
                    fieldId: ['$route', function($route) {
                        return $route.current.params.fieldid;
                    }],
                },
                requireAuth: true
            }).when('/fields/new', {
                templateUrl: 'partials/field/create-field.html',
                controller: 'FieldCreateController',
                controllerAs: 'vm',
                requireAuth: true
            });

            $routeProvider.when('/register',{
                templateUrl: 'partials/auth/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            }).when('/login', {
                templateUrl: 'partials/auth/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });

            $routeProvider.when('/requests', {
                templateUrl: 'partials/requests/home.html',
                controller: 'RequestsController',
                controllerAs: 'vm',
                requireAuth: true
            }).when('/opponent-requests', {
                templateUrl: 'partials/requests/opponent-requests.html',
                controller: 'OpponentRequestsController',
                controllerAs: 'vm',
                requireAuth: true
            }).when('/player-requests', {
                templateUrl: 'partials/requests/player-requests.html',
                controller: 'PlayerRequestsController',
                controllerAs: 'vm',
                requireAuth: true
            });

            $routeProvider.when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            }).otherwise('/home');
        }]);
})();
