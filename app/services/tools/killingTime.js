(function (angular) {
    'use strict';
    angular.module("ufersavdb").factory("killingTime", killingTime);
    killingTime.$inject = ['$timeout'];
    // matador de promessas
    function killingTime($timeout) {
        var service = {
            setTimeOut: _setTimeOut
        }
        return service;

        function _setTimeOut (scope, fn, delay, state) {
            var promise = $timeout(fn, delay);
            var deregister = scope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
                if (fromState.name === state) {
                    $timeout.cancel(promise);
                }
            });
            promise.then(deregister, deregister);
        }
    }

})(angular);
