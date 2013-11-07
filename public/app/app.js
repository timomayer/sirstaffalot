/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main leadboxMVC app module
 *
 * @type {angular.Module}
 */
var staffalotApp = angular.module('sirStaffalotApp', [
	'ngRoute',
	'staffingCtrl'
]);

staffalotApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
				when('/phones', {
					templateUrl: 'partials/phone-list.html',
					controller: 'PhoneListCtrl'
				}).
				when('/phones/:phoneId', {
					templateUrl: 'partials/phone-detail.html',
					controller: 'PhoneDetailCtrl'
				}).
				otherwise({
					redirectTo: '/phones'
				});
	}]);