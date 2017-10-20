(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('userController', UserController);
    UserController.$inject = ['$rootScope','$scope','userAPI','$mdToast','$mdDialog','modalService'];
    function UserController($rootScope,$scope,userAPI,$mdToast,$mdDialog,modalService){
        var vm = this;
        vm.user = $rootScope.user;
        vm.add = add;
        vm.editPass = editPass;

        // vm.getUsers = getUsers;


        vm.remove = remove;
        // vm.changeUser = changeUser;


        function add(ev) {
            $mdDialog.show(modalService.signup(ev))
                .then(function() {
                    getUsers();
                }, function() {
                    toast('Cadastro cancelado!');
                });
        }


        function remove(ev,args) {
            var confirm = $mdDialog.confirm()
                .title('Remoção de Usuário')
                .textContent('Deseja remover '+ args.username+ '?')
                .ariaLabel('Remoção')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

            $mdDialog.show(confirm).then(function() {
                userAPI.remove(args.idcli).then(function (response) {
                    toast(response.data.message);
                    getUsers();
                },function (error) {
                    toast(error.data.message);
                })
            });

        }

        function editPass(ev,args){
            var confirm = $mdDialog.confirm()
                .title('Alteração de senha')
                .textContent('Deseja alterar senha de '+ args.username+ '?')
                .ariaLabel('Edição')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

            $mdDialog.show(confirm).then(function() {
                var prompt = $mdDialog.prompt()
                    .title('Qual a nova de '+ args.username +'?')
                    .placeholder('Senha')
                    .ariaLabel('Senha')
                    .targetEvent(ev)
                    .required(true)
                    .ok('Alterar')
                    .cancel('Cancelar');

                $mdDialog.show(prompt).then(function(result) {
                    args.password = result;
                    userAPI.update(args).then(function (response) {
                        toast(response.data.message);
                    },function (error) {
                        toast(error.data.message);
                    })
                }, function() {
                    toast("Cancelado");
                });

            }, function() {

            });
        }

        /*userAPI.changeSit(args).then(function (response) {
            toast(response.data.message,'left');
            vm.users= vm.users.filter(function (cli) {
                if (cli.idcli !== args) return cli;
            });
            getUsers();
        },function (error) {
            toast(error.data.message);
        })*/

        function getUsers() {
            userAPI.getAll().then(function (response) {
                // toast(response.data.message);
                vm.users = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
        }
        getUsers();


        vm.tipBike = tipBike;
        vm.iconBike = iconBike;
        vm.tipState = tipState;
        vm.iconState = iconState;

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
    }

})(angular);
