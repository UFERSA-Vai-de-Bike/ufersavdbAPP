(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("configUserComponent",{
        templateUrl: 'app/components/user/config/config.html',
        controller: 'configUserController as vm',
        bindings: {
            id: '@'
        }
    });

})(angular);
