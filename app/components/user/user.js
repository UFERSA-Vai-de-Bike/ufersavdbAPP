(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('userController', UserController);
    UserController.$inject = ['$rootScope','$scope','userAPI','$mdToast','$mdSidenav'];
    function UserController($rootScope,$scope,userAPI,$mdToast,$mdSidenav){
        var vm = this;
        vm.user = $rootScope.user;
        vm.users;
        vm.tipBike = tipBike;
        vm.iconBike = iconBike;
        vm.tipState = tipState;
        vm.iconState = iconState;
        vm.formUser = formUser;

        vm.removeUser = removeUser;
        vm.changeUser = changeUser;

        function changeUser(args){
            userAPI.changeSit(args).then(function (response) {
                toast(response.data.message,'left');
                vm.users= vm.users.filter(function (cli) {
                    if (cli.idcli !== args) return cli;
                });
                getUsers();
            },function (error) {
                toast(error.data.message);
            })
        }

        function removeUser(args) {
            userAPI.remove(args).then(function (response) {
                toast(response.data.message);
                getUsers();
            },function (error) {
                toast(error.data.message);
            })
        }

        function formUser() {
            $mdSidenav('right').open();
        }

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
                // toast(response.data.message);
                vm.users = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }

        vm.getUsers = getUsers;
        getUsers();

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
