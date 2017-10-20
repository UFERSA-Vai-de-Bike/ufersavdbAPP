(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('formBkController', FormBkController);
    FormBkController.$inject = ['bikeAPI','$mdToast','$mdDialog'];
    function FormBkController(bikeAPI,$mdToast,$mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.validBk = validBk;
        vm.addBk = addBk;

        function addBk(args) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(args));

                bikeAPI.create(args).then(function successCallBack (response) {
                    toast(response.data.message);
                    hide();
                }, function errorCallback (error) {
                    console.log("Erro no cadastro: " + JSON.stringify(error));
                    toast(error.data.message);
                });
        }

        var names = [];
        function getNames() {
            bikeAPI.getNames().then(function succesCallBack(response) {
                names = response.data.data;
                toast(response.data.message);
            }, function errorCallback(error) {
                toast("Erro no carregamento dos nomes");
            });
        }
        getNames();
        function validBk(args) {
            for (var i = 0;i<names.length;++i){
                if (args === names[i].getbksname) {
                    return true;
                }
            }
            return false;
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
