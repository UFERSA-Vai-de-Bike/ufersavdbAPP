/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

	'use strict';
	

	angular.module('ufersavdb').factory('apiIntercept', Factory);
	
	function Factory($q, $rootScope, storeService, $timeout){
		var service = {
			request: _request,
			response: _response,
			requestError: _requestError,
			responseError: _responseError
		};
		return service;
	
		function _request (config) {

			if (false) {
				var token = storeService.getValue('tokenVDB');
				if (!token) {
					token = storeService.getSessionValue('tokenVDB');
				}

				if (token) {
					config.headers = { 'Authorization': token};
				}
			}
			console.log("- Request :" + JSON.stringify(config));
			return config;
		}

		function _response (response) {
			console.log("- Response :" + JSON.stringify(response));
			return response;
		}
	
		function _requestError (rejection) {
			console.log("- RequestError :" + JSON.stringify(rejection));

			return $q.reject(rejection);
		}

		function _responseError (response) {
			console.log("- ResponseError :" + JSON.stringify(response));

			return $q.reject(response);
		}
	}
	
	Factory.$inject = ['$q', '$rootScope', 'storeService', '$timeout'];
	

})(angular);