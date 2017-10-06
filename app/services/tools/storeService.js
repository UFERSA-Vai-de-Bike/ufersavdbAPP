/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

    'use strict';

    angular.module("ufersavdb").factory('storeService', Factory);

    function Factory (localStorageService) {

        var service = {
            setValue: _setValue,
            getValue: _getValue,
            removeValue: _removeValue,
            removeAll: _removeAll,
            setSessionValue: _setSessionValue,
            getSessionValue: _getSessionValue,
            removeSessionValue: _removeSessionValue,
            removeSessionAll: _removeSessionAll
        };

        return service;

        function _setValue(key, val) {
            console.log("storeService -- Setando " + key + " - localstorage");
            return localStorageService.set(key, val); // retorna boolean
        }
        function _getValue(key) {
            console.log(" storeService -- Pegando valor de " + key + " - localStorage");
            return localStorageService.get(key); // retorna valor
        }
        function _removeValue(key) {
            console.log(" storeService -- Removendo: " + key + " - localStorage");
            return localStorageService.remove(key); // retorna boolean
        }
        function _removeAll() {
            console.log(" storeService -- Remoção Total - localStorage!!");
            return localStorageService.clearAll();
        }
        function _setSessionValue (key, val) {
            console.log("storeService -- Setando " + key + " - sessionStorage");
            return localStorageService.set(key, val, "sessionStorage"); // retorna boolean
        }
        function _getSessionValue (key) {
            console.log("storeService -- Pegando valor de " + key + " - sessionStorage");
            return localStorageService.get(key, "sessionStorage"); // retorna boolean
        }
        function _removeSessionValue(key) {
            console.log(" storeService -- Removendo: " + key + " - sessionStorage");
            return localStorageService.remove(key, 'sessionStorage'); // retorna boolean
        }
        function _removeSessionAll() {
            console.log(" storeService -- Remoção Total - sessionStorage!!");
            return localStorageService.clearAll('sessionStorage');
        }
    }

    Factory.$inject = ['localStorageService'];

})(angular);