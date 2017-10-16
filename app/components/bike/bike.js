(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('bikeController', BikeController);
    BikeController.$inject = ['$scope','bikeAPI','$mdToast','$mdSidenav'];
    function BikeController($scope,bikeAPI,$mdToast,$mdSidenav){
        var vm = this;

        vm.tipRide = tipRide;
        vm.iconRide = iconRide;
        vm.tipState = tipState;
        vm.iconState = iconState;


        vm.removeBk = removeBk;
        vm.changeBk = changeBk;

        function changeBk(args){
            bikeAPI.changeSit(args).then(function (response) {
                toast(response.data.message,'left');
                getBikes();
            },function (error) {
                toast(error.data.message);
            })
        }

        function removeBk(args) {
            bikeAPI.remove(args).then(function (response) {
                toast(response.data.message);
                vm.bikes = vm.bikes.filter(function (bike) {
                    if (bike.idbike !== args) return bike;
                });
                getBikes();
            },function (error) {
                toast(error.data.message);
            })
        }

        /*vm.formBk = formBk;
        // var names = [];
        function formBk() {
            $mdSidenav('right').open();
        }*/


        vm.filter = {
            options: {
                debounce: 500
            }
        };
        vm.query = {
            filter: '',
            limit: 5,
            order: 'name',
            page: 1
        };

        vm.removeFilter = removeFilter;

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';
            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }
        var bookmark;
        $scope.$watch('vm.query.filter',function (newVal,oldVal) {
            if(!oldVal)
                bookmark = vm.query.page;
            if (newVal !== oldVal)
                vm.query.page = 1;
            if (!newVal)
                vm.query.page = bookmark;
        });

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
                // toast(response.data.message);
                vm.bikes = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }

        getBikes();

        function toast(message,side) {
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
