(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('formCliController', FormCliController);
    FormCliController.$inject = ['userAPI','$mdToast','$mdSidenav'];
    function FormCliController(userAPI,$mdToast,$mdSidenav) {
        var vm = this;
        vm.cancel = hide;
        vm.validUser = validUser;
        vm.addUser = addUser;

        vm.roles = [
            {
                cod: 0,
                name: "MISSINGNO"
            },
            {
                cod: 1,
                name: "Usuário"
            },
            {
                cod: 2,
                name: "Moderador"
            },
            {
                cod: 3,
                name: "Administrador"
            }
        ];

        vm.user = {
            role: 0
        };

        $mdSidenav('right').onClose(function () {
            vm.userForm.$setPristine();
        });

        function addUser(args) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(args));

                userAPI.create(args).then(function successCallBack (response) {
                    toast(response.data.message);
                    vm.upd();
                    hide(false);
                }, function errorCallback (error) {
                    console.log("Erro no cadastro: " + JSON.stringify(error));
                    // toast(error.data.message);
                });
        }

        var names = [];
        vm.getNames = getNames;
        function getNames() {
            userAPI.getNames().then(function succesCallBack(response) {
                names = response.data.data;
                toast(response.data.message);
            }, function errorCallback(error) {
                toast("Erro no carregamento dos nomes");
            });
        }
        function validUser(args) {
            for (var i = 0;i<names.length;++i){
                if (args == names[i].getclientsusername) {
                    return true;
                }
            }
            return false;
        }

        function hide (ans) {
            $mdSidenav('right').close().then(function () {
                if (ans)
                    toast("Cancelado");
            });
        }

        function toast (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('right')
                    .hideDelay(1500)
            );
        }
    }

})(angular);
