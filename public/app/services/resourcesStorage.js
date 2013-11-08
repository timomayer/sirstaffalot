/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves Leads from Node
 */
staffalotApp.factory('resourcesStorage', function($http) {
	return {
		getResources: function(cwStart, cwEnd) {
			return $http({method: 'GET', url: '_mock/getResources.json?cwStart=' + cwStart + '&cwEnd=' + cwEnd });
		}
	};
});