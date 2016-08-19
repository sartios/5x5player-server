(function() {
    'use strict';

    angular.module('field')
        .factory('FieldService', fieldService);



    function fieldService($http, AuthenticationService) {
        var service = {};
        var config = {
            headers: {
                authorization: 'Bearer ' + AuthenticationService.getToken()
            }
        };

        service.getAllFields = function() {
            return $http.get('/api/fields', config);
        };

        service.updateField = function(field) {
            return $http.put('/api/fields/' + field._id, field, config);
        };

        service.createField = function(field) {
            return $http.post('/api/fields', field, config);
        };

        service.getFieldById = function(fieldId) {
            return $http.get('/api/fields/' + fieldId, config);
        };

        service.deleteField = function(fieldId) {
            return $http.delete('/api/fields/' + fieldId, config);
        };

        service.deleteAll = function() {
            return $http.delete('/api/fields', config);
        };

        service.createMsg = {};
        service.updateMsg = {};

        return service;
    }

    fieldService.$inject = ['$http', 'AuthenticationService'];

})();
