(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('userController', UserController);
    UserController.$inject = ['$rootScope','$scope','userAPI','$mdToast'];
    function UserController($rootScope,$scope,userAPI,$mdToast){
        var vm = this;
        vm.user = $rootScope.user;
        vm.users;
        vm.tipBike = tipBike;
        vm.iconBike = iconBike;
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
            order: 'username',
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
                return 'mood';
            else
                return 'mood_bad';
        }
        function tipState(args) {
            if (args)
                return "Liberado";
            else
                return "Bloqueado";
        }
        function iconBike(args) {
            if(args)
                return 'directions_bike';
            else
                return 'directions_walk';
        }
        function tipBike(args) {
            if (args)
                return "Está usando";
            else
                return "Não está usando"
        }

        function getUsers() {
            userAPI.getAll().then(function (response) {
                toast(response.data.message);
                vm.users = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }

        getUsers();

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
