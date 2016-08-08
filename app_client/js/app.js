(function(){
  'use strict';

  angular.module('team', []);
  angular.module('player', []);
  angular.module('field', []);
  angular.module('5x5playerApp', ['team', 'player', 'field', 'ngRoute'])
    .config(function($routeProvider){

      $routeProvider.when('/',{
        templateUrl: 'partials/home.html'
      });

      $routeProvider.when('/teams',{
        templateUrl: 'partials/team/teams.html',
        controller: 'TeamListController',
        controllerAs: 'vm'
      });

      $routeProvider.when('/teams/edit/:teamid', {
        templateUrl: 'partials/team/edit-team.html',
        controller: 'TeamEditController',
        controllerAs: 'vm'
      });

      $routeProvider.when('/teams/new', {
        templateUrl: 'partials/team/create-team.html',
        controller: 'TeamCreateController',
        controllerAs: 'vm'
      });

      $routeProvider.when('/home', {
        templateUrl: 'partials/home.html'
      });

      $routeProvider.otherwise('/home');

    });

})();
