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

	staffingStorage.getProjects().success(function (data, status, headers, config) {
		$scope.projectsData = mapResultsetToProjectAssignment(data);
	});

	$scope.$watch('cwRange', function () {
		staffingStorage.getProjects($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function (data, status, headers, config) {
			$scope.projectsData = data;
		});

		resourcesStorage.getResources($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function (data, status, headers, config) {
			$scope.resourcesData = data;
		});
	}, true);

	$scope.changeDatepicker = function () {
		$scope.cwRange.cwStart = $('.cwPick1').val();
		$scope.cwRange.cwEnd = $('.cwPick2').val();
	};

	function mapResultsetToProjectAssignment(resultSet, cwRange) {
		var resultJSON = {};
		angular.forEach(resultSet, function (currentRow) {
			var cwCoord = currentRow.year + '_' + currentRow.cw;
			if (!resultJSON[currentRow.assignableId]) {
				resultJSON[currentRow.assignableId] = {};
				resultJSON[currentRow.assignableId].assignableName = currentRow.assignableName;
				resultJSON[currentRow.assignableId].assignableType = currentRow.assignableType;
				resultJSON[currentRow.assignableId].startDate = currentRow.startDate;
				resultJSON[currentRow.assignableId].endDate = currentRow.endDate;
			}
			if (!resultJSON[currentRow.assignableId]['cws']) {
				resultJSON[currentRow.assignableId]['cws'] = {};
			}
			if (!resultJSON[currentRow.assignableId]['cws'][cwCoord]) {
				resultJSON[currentRow.assignableId]['cws'][cwCoord] = [];
			}
			resultJSON[currentRow.assignableId]['cws'][cwCoord].push({
				teamMemberId: currentRow.teamMemberId,
				teamMemberName: currentRow.teamMemberName,
				teamMemberType: currentRow.teamMemberType,
				days: currentRow.days
			});
			resultJSON[currentRow.assignableId]['cwsSum'] = {};
		});

		angular.forEach(resultJSON, function (project) {
			angular.forEach(cwRange, function (cw) {
				if (!project['cws'][cw]) {
					project['cws'][cw] = [];
				}
			});
		});
		return resultJSON;
	}

	function recalculateCwSumsPerProject(projectData) {
		angular.forEach(resultJSON[currentRow.assignableId]['cws'], function (crt, crtkey) {
			resultJSON[currentRow.assignableId]['cwsSum'][crtkey] = 0;
			angular.forEach(crt, function (cr) {
				resultJSON[currentRow.assignableId]['cwsSum'][crtkey] = resultJSON[currentRow.assignableId]['cwsSum'][crtkey] + cr.days;
			});
		});
	}

	function turnFromAndToCwToRangeArray(fromCWString, toCWString) {
		var fromCW = fromCWString.split('_')[0];
		var fromYear = fromCWString.split('_')[1];
		var toCW = toCWString.split('_')[0];
		var toYear = toCWString.split('_')[0];

		var resultArray = [];
		while ((fromCW <= toCW && fromYear === toYear) || (fromYear < toYear)) {
			resultArray.push(fromYear + '_' + fromCW);

			if(fromCW === 52){
				if(moment('31.12.' + fromYear, 'DD.MM.YYYY').isoWeeks === 53){
					fromCW++;
				}
				else {
					fromCW = 1;
					fromYear++;
				}
			}
		}
		return resultArray;
	}

});
