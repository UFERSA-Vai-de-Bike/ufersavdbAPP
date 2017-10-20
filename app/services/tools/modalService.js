(function(angular) {
        'use strict';

        angular.module("ufersavdb").factory("modalService", modalService);

        //modalService.$inject= [];
        function modalService() {

            var service = {
                signup: _signup,
                addSt: _addSt,
                addBk: _addBk,
                confBk: _confBk,
                confUser: _confUser,
                profile: _profile
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

            function _profile(ev,args) {
                var profile = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Cadastro"><profile-component id="'+args+'"></profile-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return profile;
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
            function _addBk(ev) {
                var addBk = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Cadastro"><form-bk-component ></form-bk-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return addBk;
            }

            function _confBk(ev,args) {
                var confBk = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Configuração"><config-bk-component id="'+ args +'"></config-bk-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return confBk;
            }

            function _confUser(ev,args) {
                var confUser = {
                    //controller: dialogController, // SE NECESSÁRIO
                    template: '<md-dialog aria-label="Configuração"><config-user-component id="'+ args +'"></config-user-component></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                };
                return confUser;
            }

            /*controller: dialogController,
                controllerAs: 'vm',
                bindToController: true,
                resolve: {
                args: function () {
                    return args;
                }
            }
            function dialogController($mdDialog,args) {
                var vm = this;
                vm.cancel = function () {
                    $mdDialog.hide();
                }
                vm.args = args;
            }
            dialogController.$inject = ['$mdDialog','args'];*/
        }
})(angular);
