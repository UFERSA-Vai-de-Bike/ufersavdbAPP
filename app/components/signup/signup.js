(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('signUpController', SignUpController);
    SignUpController.$inject = ['userAPI','$mdDialog','$mdToast'];
    function SignUpController(userAPI,$mdDialog,$mdToast){
        var vm = this;

        vm.user = $rootScope.user;
        vm.cancel = cancel;
        vm.signup = signup;
        vm.next = next;
        vm.previous = previous;
        vm.selectedIndex = 0;
        vm.step0 = false;
        vm.step1 = true;

        function signup(user) {
            console.log(" -- CADASTRAR -");
            userAPI.signup(user).then(function successCallBack (response) {
                toast(response.data.message);

            }, function errorCallback (error) {
                console.log("Erro no cadastro: " + JSON.stringify(error));
                // toast(error.data.message);
            });
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
                    .hideDelay(3000)
            );
        }

    }

})(angular);
