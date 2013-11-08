/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('staffingStorage', function($http) {
	return {
		getProjects: function(cwStart, cwEnd) {
			return $http({method: 'GET', url: '/list/assignments?fromCW=' + cwStart + '&toCW=' + cwEnd });
		}
	};
});