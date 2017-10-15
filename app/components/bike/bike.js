(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('bikeController', BikeController);
    BikeController.$inject = ['$rootScope','bikeAPI','$mdToast'];
    function BikeController($rootScope,bikeAPI,$mdToast){
        var vm = this;
        vm.bikes;

        vm.tipRide = tipRide;
        vm.iconRide = iconRide;
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
                return "Disponível";
            else
                return "Indisponível";
        }
        function iconRide(args) {
            if(args)
                return 'share';
            else
                return 'beenhere';
        }
        function tipRide(args) {
            if (args)
                return "Compartilhada";
            else
                return "Na estação";
        }

        function getBikes() {
            bikeAPI.getAll().then(function (response) {
                toast(response.data.message);
                vm.bikes = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }

        getBikes();

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
