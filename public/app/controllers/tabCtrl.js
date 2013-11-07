/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('tabCtrl', function tabCtrl($scope, $location, filterFilter) {

	$scope;

	$scope.pageTabs =
			[
				{active: true},
				{active: false},
				{active: false}
			];

	$scope.pageTabSelect = function(tab) {
		angular.forEach($scope.pageTabs, function(val, key) {
			$scope.pageTabs[key].active = false;
		});
		$scope.pageTabs[tab].active = true;
	};

});