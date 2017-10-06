/**
 * Created by silva on 04/10/17.
 */

(function(angular){
    "use strict";

    angular.module('ufersavdb').factory('sessionAPI', Factory);
    
    function Factory($http, config, $q){
        var service = {
            login: _login,
            logout: _logout
        };
        return service;
    
        function _login (data) {
            var defer = $q.defer();
            var foo = {
                username: "aretw0",
                password: "bikeshare18"
            };

            if (angular.equals(foo,data)) {
                defer.resolve({
                    status: 200,
                    dsc: 'Login feito!'
                });
            }
            else {
                defer.reject({
                    status: 400,
                    dsc: "Login e/ou senha errado!"
                })
            }

            return defer.promise;
            //return $http.post(config.baseUrl + "/login", data);
        }
    
        function _logout () {
    
        }
    }
    
    Factory.$inject = ['$http','config', '$q'];
})(angular);