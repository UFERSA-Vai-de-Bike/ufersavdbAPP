(function (angular) {

    'use strict';

    angular.module("ufersavdb").component("formBkComponent",{
        templateUrl: 'app/components/bike/formBk/form.html',
        controller: 'formBkController as vm',
        bindings:{
            bk: '<'
        }
    });

})(angular);
