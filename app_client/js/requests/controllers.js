(function(){
  'use strict';
  /* jshint validthis: true */

  angular.module('app.requests')
    .controller('RequestsController', requestsCtrl);

  angular.module('app.requests')
    .controller('OpponentRequestsController', opponentReqCtrl);

  angular.module('app.requests')
    .controller('FieldsModalController', fieldsModalCtrl);

  requestsCtrl.$inject = ['$location'];

  function requestsCtrl($location){
      var vm = this;

      vm.createOpponentRequest =  function(){
        $location.path('/opponent-requests');
      };

      var init = function(){};
      init();
  }

  opponentReqCtrl.$inject = ['$modal', 'OpponentRequestService', 'UserService'];

  function opponentReqCtrl($modal, OpponentRequestService, UserService){
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
        console.log('Successful request creation', data);
      });
    };

    var init = function(){
      vm.opponentReq = { field: {}, team: {}};
      UserService.getTeams().success(function(data){
        teams = data;
      });
    };
    init();
  }

  fieldsModalCtrl.$inject = ['$modalInstance', 'FieldService'];
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



})();
