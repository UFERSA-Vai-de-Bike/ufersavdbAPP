(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('stationController', StationController);
    StationController.$inject = ['$rootScope','stationAPI','$mdToast']
    function StationController($rootScope,stationAPI,$mdToast){
        var vm = this;

        vm.stations;

        vm.tipState = tipState;
        vm.iconState = iconState;

        function iconState(args) {
            if(args)
                return 'cloud_done';
            else
                return 'cloud_off';
        }
        function tipState(args) {
            if (args)
                return "Operando";
            else
                return "Não operando";
        }

        function getStations() {
            stationAPI.getAll().then(function (response) {
                toast(response.data.message);
                vm.stations = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }

        getStations();

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
