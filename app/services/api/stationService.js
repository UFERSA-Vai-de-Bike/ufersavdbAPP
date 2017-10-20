(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .factory('stationAPI', stationAPIFactory);

    stationAPIFactory.$inject = ["$http","config"];
    function stationAPIFactory($http,config){
        var service = {
            getAll: _getAll, // feito
            get: _get, // feito
            getVal: _getVal, // feito
            getNames: _getNames, //feito
            create: _create, // feito
            update: _update, // feito
            remove: _remove, // feito
            getLogs: _getLogs, // feito
            getLog: _getLog, // feito
            getSlots: _getSlots,
            changeSit: _changeSit // feito
        };
        return service;

        function _changeSit(id) {
            return $http.get(config.baseUrl + "/stations/sit/" + id); // feito
        }
        function _getSlots(id) {
            return $http.get(config.baseUrl + "/stations/slots/" + id); // feito
        }
        function _getLog(id) {
            return $http.get(config.baseUrl + "/stations/log/" + id); // feito
        }
        function _getLogs() {
            return $http.get(config.baseUrl + "/stations/log"); // feito
        }
        function _remove(id) {
            return $http.delete(config.baseUrl + "/stations/" + id); // feito
        }
        function _update(data) {
            return $http.put(config.baseUrl + "/stations", data); // feito
        }
        function _create(data) {
            return $http.post(config.baseUrl + "/stations",data); // feito
        }
        function _getNames() {
            return $http.get(config.baseUrl + "/stations/n"); // feito
        }
        function _getVal() {
            return $http.get(config.baseUrl + "/stations/val"); // feito
        }
        function _get(id) {
            return $http.get(config.baseUrl + "/stations/" + id); // feito
        }
        function _getAll() {
            return $http.get(config.baseUrl + "/stations"); // feito
        }
    }

})(angular);
