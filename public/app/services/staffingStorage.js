/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('staffingStorage', function($http) {
	return {
		getProjects: function(cwStart, cwEnd) {
			cwStart = '2013_33';
			cwEnd = '2013_44';
			return $http({method: 'GET', url: '/list/assignments?fromCW=' + cwStart + '&toCW=' + cwEnd });
		}
	};
});