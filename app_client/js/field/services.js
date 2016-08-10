(function() {
    'use strict';

    angular.module('field')
        .factory('FieldService', fieldService);

    fieldService.$inject = ['$http'];

    function fieldService($http) {
        var service = {};

        service.getAllFields = function() {
            return $http.get('/api/fields');
        };

        service.updateField = function(field) {
            return $http.put('/api/fields/' + field._id, field);
        };

        service.createField = function(field) {
            return $http.post('/api/fields', field);
        };

        service.getFieldById = function(fieldId){
            return $http.get('/api/fields/' + fieldId);
        };

        service.deleteField = function(fieldId){
            return $http.delete('/api/fields/' + fieldId);
        };

        service.deleteAll = function(){
            return $http.delete('/api/fields');
        };

        service.createMsg = {};
        service.updateMsg = {};

        return service;
    }

})();
