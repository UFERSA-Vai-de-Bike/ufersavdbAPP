(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("configBkComponent",{
        templateUrl: 'app/components/bike/config/config.html',
        controller: 'configBkController as vm',
        bindings: {
            id: '@'
        }
    });

})(angular);
