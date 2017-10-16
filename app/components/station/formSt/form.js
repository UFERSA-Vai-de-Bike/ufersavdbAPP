(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('formStController', FormStController);
    FormStController.$inject = ['stationAPI','$mdToast','$mdSidenav'];
    function FormStController(stationAPI,$mdToast,$mdSidenav) {
        var vm = this;

        vm.cancel = hide;
        vm.validSt = validSt;
        vm.addSt = addSt;

        function addSt(args) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(args));

                stationAPI.create(args).then(function successCallBack (response) {
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
            stationAPI.getNames().then(function succesCallBack(response) {
                names = response.data.data;
                toast(response.data.message);
            }, function errorCallback(error) {
                toast("Erro no carregamento dos nomes");
            });
        }

        function validSt(args) {
            for (var i = 0;i<names.length;++i){
                if (args == names[i].getstsname) {
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
