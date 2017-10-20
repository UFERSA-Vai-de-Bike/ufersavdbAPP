(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('profileController', ProfileController);
    ProfileController.$inject = ['userAPI','$mdDialog','$mdToast'];
    function ProfileController(userAPI,$mdDialog,$mdToast){
        var vm = this;

        vm.cancel = cancel;

        vm.selectedIndex = 0;


        /*console.log(" -- EDITAR -");
        console.log(JSON.stringify(user));
        userAPI.update(user).then(function successCallBack (response) {
            toast(response.data.message);
            hide();
        }, function errorCallback (error) {
            console.log("Erro na edição: " + JSON.stringify(error));
            // toast(error.data.message);
        });*/


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
