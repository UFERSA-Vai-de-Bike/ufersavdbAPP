/**
 * Created by silva on 04/10/17.
 */
(function () {
    'use strict';

    angular.module("ufersavdb",['ui.router','ngMaterial','LocalStorageModule']).run(init);

    init.$inject = ["$rootScope","storeService"];
    function init($rootScope,storeService) {
        console.log(" --- OLHA O RUN ----");

        $rootScope.user = null;
        $rootScope.online = false;
        var user = storeService.getValue('user');
        console.log("-- app run - user: " + JSON.stringify(user));
        if (user == null) {
            user = storeService.getSessionValue('user');
            console.log("-- app run - session (user): " + JSON.stringify(user));
        }
        if (user != null) {
            $rootScope.user = user;
            $rootScope.online = true;
        }
    }
})();
