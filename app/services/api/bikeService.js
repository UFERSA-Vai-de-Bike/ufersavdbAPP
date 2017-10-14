(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .factory('bikeAPI', bikeAPIFactory);

    bikeAPIFactory.$inject = ["$http","config"];
    function bikeAPIFactory($http,config){
        var service = {
            getAll: _getAll, // feito
            get: _get, // feito
            getVal: _getVal, // feito
            getNames: _getNames, //feito
            getBySt: _getBySt, //feito
            getByStOff: _getByStOff, // feito
            getByStOn: _getByStOn, // feito
            create: _create, // feito
            update: _update, // feito
            updateST: _updateST,
            remove: _remove, // feito
            getLogs: _getLogs, // feito
            getLog: _getLog, // feito
            changeSit: _changeSit // feito
        };
        return service;

        function _changeSit(id) {
            return $http.get(config.baseUrl + "/bikes/sit/" + id); // feito
        }
        function _getLog(id) {
            return $http.get(config.baseUrl + "/bikes/log/" + id); // feito
        }
        function _getLogs() {
            return $http.get(config.baseUrl + "/bikes/log"); // feito
        }
        function _remove(id) {
            return $http.delete(config.baseUrl + "/bikes/" + id); // feito
        }
        function _update(data) {
            return $http.put(config.baseUrl + "/bikes",data); // feito
        }
        function _updateST(data) {
            return $http.get(config.baseUrl + "/bikes/station_up/" + data.bk + "&" + data.st + "&" + data.sl); // feito
        }
        function _create(data) {
            return $http.get(config.baseUrl + "/bikes",data); // feito
        }
        function _getNames() {
            return $http.get(config.baseUrl + "/bikes/n"); // feito
        }
        function _getByStOn(id) {
            return $http.get(config.baseUrl + "/bikes/station_on/" + id); // feito
        }
        function _getByStOff(id) {
            return $http.get(config.baseUrl + "/bikes/station_off/" + id); // feito
        }
        function _getBySt(id) {
            return $http.get(config.baseUrl + "/bikes/station/" + id); // feito
        }
        function _getVal() {
            return $http.get(config.baseUrl + "/bikes/val"); // feito
        }
        function _get(id) {
            return $http.get(config.baseUrl + "/bikes/" + id); // feito
        }
        function _getAll() {
            return $http.get(config.baseUrl + "/bikes"); // feito
        }
    }

})(angular);
