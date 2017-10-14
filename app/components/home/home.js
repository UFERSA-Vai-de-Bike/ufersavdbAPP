(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('homeController', HomeController);
    HomeController.$inject = ['$rootScope','$state'];
    function HomeController($rootScope,$state){
        var vm = this;

        vm.user = $rootScope.user;

        vm.logout = logout;


        function logout() {
            $state.go('app');
        }

    }

})(angular);
