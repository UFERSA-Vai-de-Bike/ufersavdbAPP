(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('dashController', DashController);
    DashController.$inject = ['$rootScope','$scope','transactionAPI','stationAPI','$mdToast']
    function DashController($rootScope,$scope,transactionAPI,stationAPI,$mdToast){
        var vm = this;
        vm.user = $rootScope.user;

        function getState() {
            transactionAPI.getAllCount().then(function (resp) {
                vm.system = resp.data.data;
            }, function (err) {
                toast(err.data.message);
            })
            stationAPI.getVal().then(function (resp) {
                vm.stations = resp.data.data.length;
            },function (err) {
                toast(err.data.message)
            })
        }
        getState();
        function toast(message, side) {
            if (typeof side == 'undefined')
                side = 'right';
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top ' + side)
                    .hideDelay(3000)
            );
        }
    }

})(angular);
