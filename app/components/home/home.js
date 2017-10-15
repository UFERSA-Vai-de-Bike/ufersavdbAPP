(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('homeController', HomeController);
    HomeController.$inject = ['$rootScope','$state','storeService','$mdToast','transactionAPI'];
    function HomeController($rootScope,$state,storeService,$mdToast,transactionAPI){
        var vm = this;

        vm.user = $rootScope.user;
        vm.logout = logout;
        vm.selectedPage = 'dash';
        $state.go('home.' + vm.selectedPage);

        function logout() {
            console.log(" -- LOGOUT TRY -")
            $rootScope.user = null;
            $rootScope.online = false;
            storeService.removeSessionValue('user');
            toast('Desconectado!');
            $state.go('app');
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
