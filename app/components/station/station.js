(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('stationController', StationController);
    StationController.$inject = ['$scope','stationAPI','$mdToast','$mdDialog','modalService']
    function StationController($scope,stationAPI,$mdToast,$mdDialog,modalService){
        var vm = this;

        vm.getStations = getStations;

        /*vm.remove = remove;
        vm.change = change;*/


        vm.add = add;
        function add(ev) {
            $mdDialog.show(modalService.addSt(ev))
                .then(function() {
                    getStations();
                }, function() {
                    toast('Cadastro cancelado!');
                });
        }

        function change(args){
            stationAPI.changeSit(args).then(function (response) {
                toast(response.data.message,'left');
                getStations();
            },function (error) {
                toast(error.data.message);
            })
        }

        function remove(args) {
            stationAPI.remove(args).then(function (response) {
                toast(response.data.message);
                vm.stations= vm.stations.filter(function (st) {
                    if (st.idstation !== args) return st;
                });
                getStations();
            },function (error) {
                toast(error.data.message);
            })
        }

        function getStations() {
            stationAPI.getAll().then(function (response) {
                // toast(response.data.message);
                vm.stations = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }
        getStations();

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
    }

})(angular);
