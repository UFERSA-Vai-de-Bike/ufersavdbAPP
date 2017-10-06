/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

	'use strict';
	

	angular.module('app').config(config);
	
	function config(localStorageServiceProvider){
		localStorageServiceProvider.setPrefix('ufvdb').setNotify(true, true);
	}
	
	config.$inject = ['localStorageServiceProvider'];
	

})(angular);