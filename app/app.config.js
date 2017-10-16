/**
 * Created by silva on 06/10/17.
 */

(function (angular) {

	'use strict';

	angular.module('ufersavdb').config(config);

    config.$inject = ['localStorageServiceProvider','$httpProvider','$mdThemingProvider'];
	function config(localStorageServiceProvider, $httpProvider,$mdThemingProvider){
		localStorageServiceProvider.setPrefix('ufvdb').setNotify(true, true);
		$httpProvider.interceptors.push("apiIntercept");

		$mdThemingProvider.definePalette('altBlue', {
            '50': '#2196f3',
            '100': '#2196f3',
            '200': '#2196f3',
            '300': '#2196f3',
            '400': '#2196f3',
            '500': '#2196f3',
            '600': '#2196f3',
            '700': '#2196f3',
            '800': '#2196f3',
            '900': '#2196f3',
            'A100': '#2196f3',
            'A200': '#2196f3',
            'A400': '#2196f3',
            'A700': '#2196f3',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
        });
		$mdThemingProvider.theme('altTheme1')
            .primaryPalette('altBlue')
            .accentPalette('altBlue')
	}




})(angular);
