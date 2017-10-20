(function(angular) {
        'use strict';

        angular.module("ufersavdb").factory("modalService", modalService);

        //modalService.$inject= [];
        function modalService() {

            var service = {
                signup: _signup,
                addSt: _addSt
                /*
                novoModal: _novoModal //,

                adicione aqui outras configurações dos modais

                Estou tentando ver se podemos usar apenas component aqui
                para não precisar importar controller e templateURL

                */
            };
            return service;

            function _signup(ev) {
                var signup = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Cadastro"><sign-up-component></sign-up-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return signup;
            }
            function _addSt(ev) {
                var addSt = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Cadastro"><form-st-component ></form-st-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return addSt;
            }


            function dialogController($mdDialog) {
                var vm = this;
                vm.cancel = function () {
                    $mdDialog.hide();
                }
            }

            dialogController.$inject = ['$mdDialog'];
        }
})(angular);
