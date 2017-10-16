(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('hsController', HsController);
    HsController.$inject = ['$scope','transactionAPI','$mdToast'];
    function HsController($scope,transactionAPI,$mdToast){
        var vm = this;
        vm.hss;

        vm.tipState = tipState;
        vm.iconState = iconState;

        vm.filter = {
            options: {
                debounce: 500
            }
        };
        vm.query = {
            filter: '',
            limit: 5,
            order: 'state',
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
                return 'flight_land';
            else
                return 'flight_takeoff';
        }
        function tipState(args) {
            if (args)
                return "Concluído";
            else
                return "Em aberto";
        }

        function getLogs() {
            transactionAPI.getAll().then(function (response) {
                vm.hss = response.data.data;
                toast(response.data.message);
            },function (error) {
                toast(error.data.message);
            })
        }

        getLogs();

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
