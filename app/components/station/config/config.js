(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('configStController', ConfigStController);
    ConfigStController.$inject = ['$scope','bikeAPI','$mdToast','$mdDialog'];
    function ConfigStController($scope,bikeAPI,$mdToast,$mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.validBk = validBk;
        vm.upd = upd;

        function upd(args) {
            bikeAPI.update(args).then(function (response) {
                toast(response.data.message);
                hide();
            }, function (err) {
                toast(err.data.message);
                cancel();
            })
        }

        function validBk(args) {
            for (var i = 0; i < names.length; ++i) {
                if (args === names[i].getbksname) {
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
            bikeAPI.get(args).then(function (response) {
                vm.bike = response.data.data;
                toast(response.data.message);

                bikeAPI.getNames().then(function succesCallBack(resp) {
                    names = resp.data.data.filter(function (args) {
                        if (vm.bike.name !== args.getbksname) return args;
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
