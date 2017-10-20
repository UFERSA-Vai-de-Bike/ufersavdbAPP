(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('configUserController', ConfigUserController);
    ConfigUserController.$inject = ['$scope','userAPI','$mdToast','$mdDialog'];
    function ConfigUserController($scope,userAPI,$mdToast,$mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.validUser = validUser;
        vm.upd = upd;

        function upd(args) {
            userAPI.update(args).then(function (response) {
                toast(response.data.message);
                hide();
            }, function (err) {
                toast(err.data.message);
                cancel();
            })
        }

        function validUser(args) {
            for (var i = 0;i<names.length;++i){
                if (args === names[i].getclientsusername) {
                    return true;
                }
            }
            return false;
        }

        this.$onInit = function () {
            init(this.id);
        };
        var names = [];
        function init(args) {
            userAPI.get(args).then(function (response) {
                vm.user = response.data.data;
                vm.user.passRepeat = vm.user.password;
                toast(response.data.message);

                userAPI.getNames().then(function succesCallBack(resp) {
                    names = resp.data.data.filter(function (args) {
                        if (vm.user.username !== args.getclientsusername) return args;
                    });
                }, function errorCallback(error) {
                    toast("Erro no carregamento dos nomes");
                    cancel();
                });
            }, function (error) {
                toast(error.data.message)
                cancel();
            })

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function hide() {
            $mdDialog.hide();
        }

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
