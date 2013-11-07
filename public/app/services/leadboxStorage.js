/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
leadbox.factory('leadStorage', function($http) {
	return {
		get: function(filterState) {
			return $http({method: 'POST', url: '/leads/filter', data: filterState });
		}
	};
});