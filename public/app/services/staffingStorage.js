/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('staffingStorage', function($http) {
	return {
		get: function(filterState) {
			return $http({method: 'GET', url: '_mock/getProjects.json', data: filterState });
		}
	};
});