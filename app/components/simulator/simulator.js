(function(angular){
    "use strict";
    angular.module('ufersavdb')
        .controller('simulatorController', SimulatorController);
    SimulatorController.$inject = ['$scope','stationAPI','$mdToast','userAPI','bikeAPI','simAPI','transactionAPI'];
    function SimulatorController($scope,stationAPI,$mdToast,userAPI,bikeAPI,simAPI,transactionAPI){
        var vm = this;

        vm.doLoan = doLoan;
        vm.doReturn = doReturn;


        function doLoan(args) {
            simAPI.doLoan(args).then(function (resp) {
                toast(resp.data.message);
                getState()
            },function (err) {
                toast(err.data.message);
            });
        }

        function doReturn(args) {
            transactionAPI.getBikeOfCli(args.user).then(function (resp) {
                args.bike = resp.data.data.getbikeofcli;
                simAPI.doReturn(args).then(function (resp) {
                    toast(resp.data.message);
                    getState();
                },function (err) {
                    toast(err.data.message);
                })
            },function (err) {
                toast(err.data.message);
            })
        }

        function getState() {
            vm.loan = {};
            vm.return = {};
            stationAPI.getVal().then(function (response) {
                // toast(response.data.message);
                vm.stationsOut = vm.stationsIn = response.data.data;
            },function (error) {
                toast(error.data.message);
            });
            userAPI.getAll().then(function (resp) {
                vm.usersOut = resp.data.data.filter(function (args) {
                    if (!args.onbike && args.state) return args;
                });
                vm.loan.user = vm.usersOut[0].idcli;
                vm.usersIn = resp.data.data.filter(function (args) {
                    if (args.onbike && args.state) return args;
                })
                vm.return.user = vm.usersIn[0].idcli;
            },function (err) {
                toast(error.data.message);
            })
        }
        getState();
        //
        $scope.$watch('vm.loan.station',function (newVal,oldVal) {
            if (newVal !== oldVal && typeof newVal !== 'undefined') {
                vm.blockOp1 = true;
                bikeAPI.getByStOn(newVal).then(function (resp) {
                    vm.blockOp1 = false;
                    vm.bikes = resp.data.data;
                },function (err) {
                    vm.blockOp1 = false;
                    toast(err.data.message);
                })
            }
        });

        $scope.$watch('vm.return.station',function (newVal,oldVal) {
            if (newVal !== oldVal && typeof newVal !== 'undefined') {
                vm.blockOp2 = true;
                 stationAPI.getSlots(newVal).then(function (resp) {
                    vm.blockOp2 = false;
                    vm.slots = resp.data.data.filter(function (args) {
                        if (args.state && !args.bike) return args;
                    });
                },function (err) {
                    vm.blockOp2 = false;
                    toast(err.data.message);
                })
            }
        });

        /*$scope.$watch('vm.return.user',function (newVal,oldVal) {
            if (newVal !== oldVal) {
                vm.blockOp2 = true;
                /!*stationAPI.getSlots(newVal).then(function (resp) {
                    vm.blockOp2 = false;
                    vm.slots = resp.data.data.filter(function (args) {
                        if (args.state) return args;
                    });
                },function (err) {
                    vm.blockOp2 = false;
                    toast(err.data.message);
                })*!/
            }


        });*/

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
