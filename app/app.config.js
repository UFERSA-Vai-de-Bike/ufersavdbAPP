/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

	'use strict';
	

	angular.module('ufersavdb').config(config);
	
	function config(localStorageServiceProvider, $httpProvider){
		localStorageServiceProvider.setPrefix('ufvdb').setNotify(true, true);

		$httpProvider.interceptors.push("apiIntercept");
	}
	
	config.$inject = ['localStorageServiceProvider','$httpProvider'];
	

})(angular);