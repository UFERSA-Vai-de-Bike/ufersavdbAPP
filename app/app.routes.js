/**
 * Created by silva on 04/10/17.
 */

(function (angular) {

    'use strict';

    angular.module('ufersavdb').config(configRouter);


        function configRouter ($stateProvider, $urlRouterProvider) {
            $stateProvider

            // login
                .state('app', {
                    url: '/app',
                    component: 'appComponent'
                    /*resolve: {
                        skipIfAuthenticated: _skipIfAuthenticated
                    }*/
                })
                .state('home', {
                    url: '/home',
                    component: 'homeComponent'
                    /*resolve: {
                        skipIfAuthenticated: _skipIfAuthenticated
                    }*/
                });
            $urlRouterProvider.otherwise('/app');
        };

        configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

})(angular);
