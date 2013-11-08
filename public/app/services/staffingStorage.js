/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('staffingStorage', function($http) {
	return {
		getProjects: function(cwStart, cwEnd) {
			cwStart = '2013_31';
			cwEnd = '2013_47';
			return $http({method: 'GET', url: '/list/assignments?fromCW=' + cwStart + '&toCW=' + cwEnd });
		}
	};
});