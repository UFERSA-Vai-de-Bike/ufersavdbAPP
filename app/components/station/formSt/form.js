(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('formStController', FormStController);
    FormStController.$inject = ['stationAPI','$mdToast','$mdDialog'];
    function FormStController(stationAPI,$mdToast,$mdDialog) {
        var vm = this;

        vm.cancel = cancel;

        vm.validSt = validSt;
        vm.addSt = addSt;

        function addSt(args) {
            console.log(" -- CADASTRAR -");
            console.log(JSON.stringify(args));
            stationAPI.create(args).then(function successCallBack (response) {
                toast(response.data.message);
                hide();
            }, function errorCallback (error) {
                console.log("Erro no cadastro: " + JSON.stringify(error));
                toast(error.data.message);
            });
        }

        var names = [];
        function getNames() {
            stationAPI.getNames().then(function succesCallBack(response) {
                names = response.data.data;
                toast(response.data.message);
            }, function errorCallback(error) {
                toast("Erro no carregamento dos nomes");
            });
        }
        getNames();

        function validSt(args) {
            for (var i = 0;i<names.length;++i){
                if (args === names[i].getstsname) {
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
