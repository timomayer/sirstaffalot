/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('staffingStorage', function($http) {
	return {
		getProjects: function(cwStart, cwEnd) {
			return $http({method: 'GET', url: '_mock/getProjects.json?cwStart=' + cwStart + '&cwEnd=' + cwEnd });
		}
	};
});