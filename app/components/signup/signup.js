(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('signUpController', SignUpController);
    SignUpController.$inject = ['userAPI','$mdDialog','$mdToast'];
    function SignUpController(userAPI,$mdDialog,$mdToast){
        var vm = this;

       /* vm.user = {
            "username":"teste1",
            "password":"amanhaagentefaz",
            "passRepeat":"amanhaagentefaz",
            "fullname":"Teste Olá",
            "sex":"U",
            "profession":"teste",
            "email": "teste@ufersa.vdb.br",
            "phone":"99976-8606"
        };*/

        vm.maxDate = new Date();
        vm.validUser = validUser;
        vm.cancel = cancel;
        vm.signUp = signUp;
        vm.next = next;
        vm.previous = previous;
        vm.selectedIndex = 0;
        vm.step0 = false;
        vm.step1 = true;

        function signUp(user) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(user));
            userAPI.signup(user).then(function successCallBack (response) {
                toast(response.data.message);
                hide();
            }, function errorCallback (error) {
                console.log("Erro no cadastro: " + JSON.stringify(error));
                // toast(error.data.message);
            });
        }

        /*console.log(" -- EDITAR -");
        console.log(JSON.stringify(user));
        userAPI.update(user).then(function successCallBack (response) {
            toast(response.data.message);
            hide();
        }, function errorCallback (error) {
            console.log("Erro na edição: " + JSON.stringify(error));
            // toast(error.data.message);
        });*/

        var names = [];
        userAPI.getNames().then(function succesCallBack(response) {
            names = response.data.data;
            toast(response.data.message);
        }, function errorCallback(error) {
            toast("Erro no carregamento dos nomes");
        });
        function validUser(args) {
            for (var i = 0;i<names.length;++i){
                if (args === names[i].getclientsusername) {
                    return true;
                }
            }
            return false;
        }

        function previous () {
            vm.step0 = false;
            --vm.selectedIndex;
            vm.step1 = true;
        }
        function next () {
            vm.step1 = false;
            ++vm.selectedIndex;
            vm.step0 = true;
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function hide () {
            $mdDialog.hide();
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
