/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

	'use strict';

	angular.module('ufersavdb').config(config);

    config.$inject = ['localStorageServiceProvider','$httpProvider'];
	function config(localStorageServiceProvider, $httpProvider){
		localStorageServiceProvider.setPrefix('ufvdb').setNotify(true, true);

		$httpProvider.interceptors.push("apiIntercept");
	}




})(angular);
