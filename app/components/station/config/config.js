(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('configStController', ConfigStController);
    ConfigStController.$inject = ['$scope','stationAPI','$mdToast','$mdDialog'];
    function ConfigStController($scope,stationAPI,$mdToast,$mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.validSt = validSt;
        vm.upd = upd;

        function upd(args) {
            stationAPI.update(args).then(function (response) {
                toast(response.data.message);
                hide();
            }, function (err) {
                toast(err.data.message);
                cancel();
            })
        }

        function validSt(args) {
            for (var i = 0; i < names.length; ++i) {
                if (args === names[i].getstsname) {
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
            stationAPI.get(args).then(function (response) {
                vm.station = response.data.data;
                vm.station.passRepeat = vm.station.password;
                toast(response.data.message);

                stationAPI.getNames().then(function succesCallBack(resp) {
                    names = resp.data.data.filter(function (args) {
                        if (vm.station.name !== args.getstsname) return args;
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
