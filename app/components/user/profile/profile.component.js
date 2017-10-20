(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("profileComponent",{
        templateUrl: 'app/components/profile/profile.html',
        controller: 'profileController as vm',
        bindings:{
            id: '@'
        }
    });

})(angular);
