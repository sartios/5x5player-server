(function(){
  'use strict';
})();

angular.module('player')
  .controller('PlayerListController', ['$scope', function($scope){

    var init = function(){
      $scope.players = [{
        id: 1,
        name : 'Player 1',
        position : 'Defense',
        number : 7,
        availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
      },{
        id: 2,
        name : 'Player 2',
        position : 'Goalkeeper',
        number : 1,
        availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
      },{
        id: 3,
        name : 'Player 3',
        position : 'Offense',
        number : 10,
        availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
      }];
    };
    init();
  }]);

angular.module('player')
  .controller('PlayerCreateController', ['$scope', function($scope){

    $scope.addPlayer = function(){
      console.log($scope.player);
    };

    var init = function(){};
    init();
  }]);

angular.module('player')
  .controller('PlayerEditController', ['$scope', function($scope){

    $scope.updatePlayer = function(){
      console.log($scope.player);
    };

    var init = function(){
      $scope.player = {
        name: 'Player name',
        position: 'Goalkeeper',
        number: 12,
        days: ['21:00']
      };
    };
    init();
  }]);
