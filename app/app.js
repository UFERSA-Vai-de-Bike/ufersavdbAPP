/**
 * Created by silva on 04/10/17.
 */
(function (angular) {
    'use strict';

    angular.module('ufersavdb').controller('appCtrl', appCtrl);

    appCtrl.$inject = ['userAPI','$state'];
    function appCtrl(userAPI, $state) {
        var vm = this;

        vm.login = login;

        var foo = {
            username: "underaid",
            password: "killingin88"
        };
        vm.user = foo;


        function login(args) {
            console.log("-- login TRY --");
            userAPI.login(args).then(function successcallBack (response) {
                console.log('--- SUCCESS (login) ---');
                console.log(JSON.stringify(response));
                //$state.go('home');
            },
            function errorCallback (error) {
                console.log('--- ERROR (login) ---');
                console.log(JSON.stringify(error));
            })
        }
    }
})(angular);
