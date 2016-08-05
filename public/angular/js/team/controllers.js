(function(){
  'use strict';
})();

angular.module('team')
  .controller('TeamListController', ['$scope', function($scope){
    var init = function(){
      $scope.teams = [{
              id: 1,
              name : 'Team 1',
              players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
              city : 'City 1',
              level : 'Beginner'
          },{
              id: 2,
              name : 'Team 2',
              players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
              city : 'City 1',
              level : 'Advanced'
          },{
              id: 3,
              name : 'Team 3',
              players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
              city : 'City 1',
              level : 'Expert'
          }];
    };
    init();
  }]);

angular.module('team')
  .controller('TeamCreateController', ['$scope', function($scope){

    $scope.addTeam = function(){
      console.log($scope.team);
    };

    var init = function(){
    };
    init();

  }]);

angular.module('team')
  .controller('TeamEditController', ['$scope', function($scope){

    $scope.updateTeam = function(){
      console.log($scope.team);
    };

    var init = function(){
      $scope.team = {
        name: 'Team name',
        players: [1,2,3,4,5],
        location: 'Team location',
        level: 'Begginer'
      };
    };
    init();
  }]);
