/**
 * Created by silva on 04/10/17.
 */
(function (angular) {
    'use strict';

    angular.module('ufersavdb').controller('appCtrl', appCtrl);

    appCtrl.$inject = ['$rootScope','$state','userAPI','storeService','$mdDialog','$mdToast'];
    function appCtrl($rootScope,$state,userAPI,storeService,$mdDialog,$mdToast) {
        var vm = this;
        var foo = {
            username: "underaid",
            password: "killingin88"
        };
        vm.user = foo;
        vm.login = login;
        vm.signup = signup;

        function login(args) {
            console.log("-- login TRY --");
            userAPI.login(args).then(function successcallBack (response) {
                console.log('--- SUCCESS (login) ---');
                console.log(JSON.stringify(response));
                toast(response.data.message);

                $rootScope.online = true;
                $rootScope.user = response.data["data"];
                args.id = response.data.data.id;
                storeService.setSessionValue('user', args);
                $state.go('home');
            },
            function errorCallback (error) {
                console.log('--- ERROR (login) ---');
                console.log(JSON.stringify(error));
                toast(error.data.message);
            })
        }

        function signup(ev) {
            $mdDialog.show(modalService.signup(ev))
                .then(function(answer) {
                    // toast('Cadastro concluido!');
                }, function() {
                    toast('Cadastro cancelado!');
                });
        }

        function toast (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('right')
                    .hideDelay(3000)
            );
        }
    }
})(angular);
