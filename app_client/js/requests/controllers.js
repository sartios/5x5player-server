(function(){
  'use strict';
  /* jshint validthis: true */

  angular.module('app.requests')
    .controller('RequestsController', requestsCtrl);

  angular.module('app.requests')
    .controller('OpponentRequestsController', opponentReqCtrl);

  angular.module('app.requests')
    .controller('FieldsModalController', fieldsModalCtrl);

    angular.module('app.requests')
      .controller('PlayerRequestsController', playerReqCtrl);


  function requestsCtrl($location){
      var vm = this;

      vm.createOpponentRequest =  function(){
        $location.path('/opponent-requests');
      };

      var init = function(){};
      init();
  }



  function opponentReqCtrl($route, $modal, OpponentRequestService, UserService){
    var vm = this;
    var teams = [];

    vm.openFields = function(){
      var dialog = $modal.open({
        templateUrl: 'partials/modals/fields-modal.html',
        controller: 'FieldsModalController as vm'
      });

      dialog.result.then(function(data){
        if(data.length > 0){
          vm.opponentReq.field = data[0];
        }
      });
    };

    vm.createRequest = function(){
      if(teams.length > 0){
        vm.opponentReq.team = angular.copy(teams[0]);
      }
      OpponentRequestService.createRequest(vm.opponentReq).success(function(data){
        $route.reload();
      });
    };

    var loadViews = function(){
      vm.createView = 'partials/requests/opponent-requests/create.html';
      vm.view = 'partials/requests/opponent-requests/list.html';
    };

    var loadRequests = function(){
      OpponentRequestService.getRequests().success(function(data){
        vm.requests = data;
      });
    };

    var loadTeams = function(){
      UserService.getTeams().success(function(data){
        teams = data;
      });
    };

    var init = function(){
      vm.opponentReq = { field: {}, team: {}};
      loadViews();
      loadRequests();
      loadTeams();
    };
    init();
  }


  function fieldsModalCtrl($modalInstance, FieldService){
    var vm = this;

    var selectedFields = [];

    vm.close = function(){
      $modalInstance.close(selectedFields);
    };

    vm.toggleField = function(field){
      if(selectedFields.indexOf(field) === -1){
        selectedFields.push(field);
      }else{
        selectedFields.splice(selectedFields.indexOf(field), 1);
      }
    };

    var loadFields = function(){
      FieldService.getAllFields().success(function(data){
        vm.fields = data;
      });
    };

    var init = function(){
      loadFields();
    };
    init();
  }

  function playerReqCtrl($route, $modal, PlayerRequestService, UserService){
    var vm = this;
    var teams = [];

    vm.openFields = function(){
      var dialog = $modal.open({
        templateUrl: 'partials/modals/fields-modal.html',
        controller: 'FieldsModalController as vm'
      });

      dialog.result.then(function(data){
        if(data.length > 0){
          vm.playerReq.field = data[0];
        }
      });
    };

    vm.createRequest = function(){
      if(teams.length > 0){
        vm.playerReq.team = angular.copy(teams[0]);
      }
      PlayerRequestService.createRequest(vm.playerReq).success(function(data){
        $route.reload();
      });
    };

    var loadTeams = function(){
      UserService.getTeams().success(function(data){
        teams = data;
      });
    };

    var loadRequests = function(){
      PlayerRequestService.getRequests()
      .success(function(data){
        vm.requests = data;
      });
    };

    var loadViews = function(){
      vm.createView = 'partials/requests/player-requests/create.html';
      vm.view = 'partials/requests/player-requests/list.html';
    };

    var init = function(){
      vm.playerReq = { field: {}, team: {}};
      loadViews();
      loadRequests();
      loadTeams();
    };

    init();
  }

  requestsCtrl.$inject = ['$location'];
  fieldsModalCtrl.$inject = ['$modalInstance', 'FieldService'];
  opponentReqCtrl.$inject = ['$route','$modal', 'OpponentRequestService', 'UserService'];
  playerReqCtrl.$inject = ['$route', '$modal', 'PlayerRequestService', 'UserService'];
})();
