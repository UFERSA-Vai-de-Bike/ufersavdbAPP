(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("formCliComponent",{
        templateUrl: 'app/components/user/formCli/form.html',
        controller: 'formCliController as vm',
        bindings:{
            upd: '<'
        }
    });

})(angular);
