(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('formBkController', FormBkController);
    FormBkController.$inject = ['bikeAPI','$mdToast','$mdSidenav'];
    function FormBkController(bikeAPI,$mdToast,$mdSidenav) {
        var vm = this;
        vm.cancel = hide;
        vm.validBk = validBk;
        vm.addBk = addBk;


        $mdSidenav('right').onClose(function () {
            vm.bikeForm.$setPristine();
        });

        function addBk(args) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(args));

                bikeAPI.create(args).then(function successCallBack (response) {
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
            bikeAPI.getNames().then(function succesCallBack(response) {
                names = response.data.data;
                toast(response.data.message);
            }, function errorCallback(error) {
                toast("Erro no carregamento dos nomes");
            });
        }
        function validBk(args) {
            for (var i = 0;i<names.length;++i){
                if (args == names[i].getbksname) {
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
