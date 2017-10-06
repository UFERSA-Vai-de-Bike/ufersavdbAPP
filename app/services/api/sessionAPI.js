/**
 * Created by silva on 04/10/17.
 */

(function(angular){
    "use strict";

    angular.module('ufersavdb').factory('sessionAPI', Factory);
    
    function Factory($http, config){
        var service = {
            login: _login,
            logout: _logout
        };
        return service;
    
        function _login (data) {
            return $http.post(config.baseUrl + "/login", data);
        }
    
        function _logout () {
    
        }
    }
    
    Factory.$inject = ['$http','config'];
})(angular);