(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .factory('transactionAPI', transactionAPIFactory);

    transactionAPIFactory.$inject = ["$http","config"];
    function transactionAPIFactory($http,config){
        var service = {
            getAll: _getAll, // feito
            getCountByCli: _getCountByCli, //feito
            getCountByBk: _getCountByBk, // feito
            getCountBySt: _getCountBySt, // feito
            getAllCount: _getAllCount, // feito
            getBySt: _getBySt, //feito
            getByBk: _getByBk, // feito
            getByCli: _getByCli, // feito
            getBikeOfCli: _getBikeOfCli
        };
        return service;

        function _getBikeOfCli(id) {
            return $http.get(config.baseUrl + "/transactions/cli/bk/" + id); // feito
        }
        function _getByCli(id) {
            return $http.get(config.baseUrl + "/transactions/cli/" + id); // feito
        }
        function _getByBk(id) {
            return $http.get(config.baseUrl + "/transactions/bk/" + id); // feito
        }
        function _getBySt(id) {
            return $http.get(config.baseUrl + "/transactions/st/" + id); // feito
        }
        function _getCountByCli(id) {
            return $http.get(config.baseUrl + "/transactions/amount/cli/"+id); // feito
        }
        function _getCountByBk(id) {
            return $http.get(config.baseUrl + "/transactions/amount/bk/"+id); // feito
        }
        function _getCountBySt(id) {
            return $http.get(config.baseUrl + "/transactions/amount/st/"+id); // feito
        }
        function _getAllCount() {
            return $http.get(config.baseUrl + "/transactions/amount"); // feito
        }
        function _getAll() {
            return $http.get(config.baseUrl + "/transactions"); // feito
        }
    }
})(angular);
