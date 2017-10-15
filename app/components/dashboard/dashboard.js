(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('dashController', DashController);
    DashController.$inject = ['$rootScope','$scope']
    function DashController($rootScope,$scope){
        var vm = this;
        vm.user = $rootScope.user;
    }

})(angular);
