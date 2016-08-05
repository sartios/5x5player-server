(function(){
  'use strict';

  angular.module('field')
    .controller('FieldListController', ['$scope', function($scope){

      var init = function(){
        $scope.fields = [{
                id : 2,
                name : 'A2',
                company : {
                    name : 'Company 1'
                },
                size : 12,
                location : 'City 1, AA 111 BBB'
            },{
                id : 3,
                name : 'A3',
                company : {
                    name : 'Company 1'
                },
                size : 22,
                location : 'City 1, AA 111 BBB'
            },{
                id : 4,
                name : 'A4',
                company : {
                    name : 'Company 1'
                },
                size : 16,
                location : 'City 1, AA 111 BBB'
            },{
                id : 5,
                name : 'A5',
                company : {
                    name : 'Company 1'
                },
                size : 12,
                location : 'City 1, AA 111 BBB'
            }];
      };
      init();
    }]);

  angular.module('field')
    .controller('FieldCreateController', ['$scope', function($scope){

      $scope.addField = function(){
        console.log($scope.field);
      };

      var init = function(){};
      init();
    }]);

  angular.module('field')
    .controller('FieldEditController', ['$scope', function($scope){

      $scope.updateField = function(){
        console.log($scope.field);
      };

      var init = function(){
        $scope.field = {
          name: 'Field name',
          size: 12,
          location: 'Field Location'
        };
      };
      init();
    }]);

})();
