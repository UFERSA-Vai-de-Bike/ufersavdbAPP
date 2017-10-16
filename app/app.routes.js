/**
 * Created by silva on 04/10/17.
 */

(function (angular) {

    'use strict';

    angular.module('ufersavdb').config(configRouter);


        function configRouter ($stateProvider, $urlRouterProvider) {
            function _skipIfAuthenticated($q, $state, $rootScope) {
                var defer = $q.defer();
                var on = $rootScope.online;
                if(on) {
                    defer.reject();
                    $state.go('home');
                } else {
                    defer.resolve();
                    $state.go('app');
                }
                return defer.promise;
            }
            // DEIXA ESSAS FUNÇÕES AQUI QUALQUER COISA NUNCAS SE SABE
            function _redirectIfNotAuthenticated($q, $state, $rootScope) {
                var defer = $q.defer();
                var on = $rootScope.online;
                if(on) {
                    defer.resolve();
                } else {
                    defer.reject();
                    $state.go('app');
                }
                return defer.promise;
            };

            $stateProvider
            // app
                .state('app', {
                    url: '/app',
                    component: 'appComponent',
                    resolve: {
                        skipIfAuthenticated: _skipIfAuthenticated
                    }
                })
                // home
                .state('home', {
                    url: '/home',
                    component: 'homeComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                })
                .state('home.dash', {
                    url: '/dash',
                    component: 'dashComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                })
                .state('home.user', {
                    url: '/user',
                    component: 'userComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                })
                .state('home.station', {
                    url: '/station',
                    component: 'stationComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                })
                .state('home.bike', {
                    url: '/bike',
                    component: 'bikeComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                })
                .state('home.history', {
                    url: '/history',
                    component: 'hsComponent',
                    resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
                });
            $urlRouterProvider.otherwise('/app');
        };

        configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

})(angular);
