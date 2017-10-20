(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("configStComponent",{
        templateUrl: 'app/components/station/config/config.html',
        controller: 'configStController as vm',
        bindings: {
            id: '@'
        }
    });

})(angular);
