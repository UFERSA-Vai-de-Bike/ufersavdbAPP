/**
 * Created by silva on 04/10/17.
 */
(function (angular) {
    'use strict';

    angular.module('ufersavdb').controller('appCtrl', appCtrl);

    function appCtrl() {
        var vm = this;

        vm.login = login;


        function login(user) {

        }
    }

    //appCtrl.$inject = [];
})(angular);