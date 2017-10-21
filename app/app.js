/**
 * Created by silva on 04/10/17.
 */
(function (angular) {
    'use strict';

    angular.module('ufersavdb').controller('appCtrl', appCtrl);

    appCtrl.$inject = ['$rootScope','$state','userAPI','storeService','$mdDialog','$mdToast','modalService'];
    function appCtrl($rootScope,$state,userAPI,storeService,$mdDialog,$mdToast,modalService) {
        var vm = this;
        /*var foo = {
            username: "underaid",
            password: "killingin88"
        };*/
        // vm.user = foo;
        vm.login = login;
        vm.signUp = signUp;

        function login(args) {
            console.log("-- login TRY --");
            userAPI.login(args).then(function successcallBack (response) {
                console.log('--- SUCCESS (login) ---');
                console.log(JSON.stringify(response));
                toast(response.data.message);

                $rootScope.online = true;
                $rootScope.user = response.data["data"];
                args.id = response.data.data.idcli;
                storeService.setSessionValue('user', args);
                $state.go('home');
            },
            function errorCallback (error) {
                console.log('--- ERROR (login) ---');
                console.log(JSON.stringify(error));
                toast(error.data.message);
            })
        }

        function signUp(ev) {
            $mdDialog.show(modalService.signup(ev))
                .then(function(answer) {
                    // toast('Cadastro concluido!');
                }, function() {
                    toast('Cadastro cancelado!');
                });
        }

        function toast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        }
    }
})(angular);
