(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('homeController', HomeController);
    HomeController.$inject = ['$rootScope','$state','storeService'];
    function HomeController($rootScope,$state,storeService){
        var vm = this;

        vm.user = $rootScope.user;
        vm.logout = logout;

        function logout() {
            console.log(" -- LOGOUT TRY -")
            $rootScope.user = null;
            $rootScope.online = false;
            storeService.removeSessionValue('user');
            toast('Desconectado!');
            $state.go('app');
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
