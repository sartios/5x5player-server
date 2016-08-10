(function() {
    'use strict';
    /* jshint validthis: true */

    angular.module('field')
        .controller('FieldListController', listCtrl);

    angular.module('field')
        .controller('FieldEditController', editCtrl);

    angular.module('field')
        .controller('FieldCreateController', createCtrl);

    listCtrl.$inject = ['FieldService'];

    function listCtrl(FieldService) {
        var vm = this;
        var init = function() {
            FieldService.getAllFields().success(function(data) {
                vm.fields = data;
            }).error(function(data) {});

            vm.createMsg = angular.copy(FieldService.createMsg);
            vm.updateMsg = angular.copy(FieldService.updateMsg);

            FieldService.createMsg = {};
            FieldService.updateMsg = {};
        };
        init();
    }

    createCtrl.$inject = ['$location', 'FieldService'];

    function createCtrl($location, FieldService) {
        var vm = this;
        vm.createField = function() {
            console.log(vm.field);
            FieldService.createField(vm.field).success(function(data) {
                FieldService.createMsg = {
                    success: 'Field with id ' + data._id + ' has been successfully created.'
                };
                $location.path('/fields');
            }).error(function(data) {
                FieldService.createMsg = {
                    error: data.message
                };
                $location.path('/fields');
            });
        };

        var init = function() {};
        init();
    }

    editCtrl.$inject = ['fieldId', '$location', 'FieldService'];

    function editCtrl(fieldId, $location, FieldService) {
        var vm = this;
        vm.updateField = function() {
            console.log(vm.field);
            FieldService.updateField(vm.field).success(function(data) {
                FieldService.updateMsg = {
                    success: 'Field with id ' + data._id + ' has been successfully updated.'
                };
                $location.path('/fields');
            }).error(function(data) {
                FieldService.updateMsg = {
                    error: data.message
                };
                $location.path('/fields');
            });
        };

        var init = function() {
            FieldService.getFieldById(fieldId).success(function(data) {
                vm.field = data;
            }).error(function(data) {});
        };
        init();
    }

})();
