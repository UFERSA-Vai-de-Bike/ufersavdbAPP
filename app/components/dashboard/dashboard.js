(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('dashController', DashController);
    DashController.$inject = ['$rootScope','$scope','transactionAPI']
    function DashController($rootScope,$scope,transactionAPI){
        var vm = this;
        vm.user = $rootScope.user;

    }

})(angular);
