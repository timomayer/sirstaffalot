
/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('staffingCtrl', function staffingCtrl($scope, $location, staffingStorage, resourcesStorage) {

	$scope.cwRange = {};
	$scope.cwRange.cwStart = 1;
	$scope.cwRange.cwEnd = 2;

	staffingStorage.getProjects().success(function(data, status, headers, config) {
		$scope.leads = data;
	});

	$scope.$watch('cwRange', function() {
		staffingStorage.getProjects($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function(data, status, headers, config) {
			$scope.projectsData = data;
		});

		resourcesStorage.getResources($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function(data, status, headers, config) {
			$scope.resourcesData = data;
		});
	}, true);
});