/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('staffingCtrl', function staffingCtrl($scope, $location, staffingStorage, resourcesStorage, $http) {

	$scope.cwRange = {};
	$scope.getTwValue = {};
	//$scope.getTwValue.days = 999;
	//$scope.getTwValue.teamMemberId = 999;
	$scope.getTwValue.cw = '2999_52';
	$scope.cwRange.cwStart = '2013_44';
	$scope.cwRange.cwEnd = '2014_01';
	$scope.cwRangeArray = [];

	staffingStorage.getProjects($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function (data, status, headers, config) {
		$scope.projectsData = mapResultsetToProjectAssignment(data, turnFromAndToCwToRangeArray($scope.cwRange.cwStart, $scope.cwRange.cwEnd));
		$scope.cwRangeArray = turnFromAndToCwToRangeArray($scope.cwRange.cwStart, $scope.cwRange.cwEnd);
		console.log($scope.projectsData);
	});
/*
	$scope.$watch('getTwValue', function() {
		if($scope.getTwValue.days !== 999) {
			console.log($scope.getTwValue.days);
			  $http({
            method : 'POST',
            url : '/insert/assignable',
            data : $scope.getTwValue
        }) .success(function(data, status, headers, config) {
			$('.tab-entryProject .alert-success').toggleClass('hidden');
        })
			.
		error(function(data, status, headers, config) {
			$('.tab-entryProject .alert-danger').toggleClass('hidden');

		});
		}
	}, true)
*/
	$scope.$watch('cwRange', function () {

		staffingStorage.getProjects($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function (data, status, headers, config) {
			$scope.projectsData = mapResultsetToProjectAssignment(data, turnFromAndToCwToRangeArray($scope.cwRange.cwStart, $scope.cwRange.cwEnd));
			$scope.cwRangeArray = turnFromAndToCwToRangeArray($scope.cwRange.cwStart, $scope.cwRange.cwEnd);
		});
		/*
		 resourcesStorage.getResources($scope.cwRange.cwStart, $scope.cwRange.cwEnd).success(function (data, status, headers, config) {
		 $scope.resourcesData = data;
		 });
		 */
	}, true);


	$scope.changeDatepicker = function () {
		$scope.cwRange.cwStart = $('.cwPick1Phantom').val();
		$scope.cwRange.cwEnd = $('.cwPick2Phantom').val();

	};


	function mapResultsetToProjectAssignment(resultSet, cwRange) {
		var resultJSON = {};

		angular.forEach(resultSet, function (currentRow) {
			var cwCoord = currentRow.year + '_' + currentRow.cw;
			// Iterate down the object to fill
			if (!resultJSON[currentRow.assignableId]) {
				resultJSON[currentRow.assignableId] = {};
				resultJSON[currentRow.assignableId].teamMemberDetail = {};
				resultJSON[currentRow.assignableId].assignableName = currentRow.assignableName;
				resultJSON[currentRow.assignableId].assignableType = currentRow.assignableType;
				resultJSON[currentRow.assignableId].startDate = currentRow.startDate;
				resultJSON[currentRow.assignableId].endDate = currentRow.endDate;
				resultJSON[currentRow.assignableId].assignableDays = currentRow.assignableDays;
			}
			if (!resultJSON[currentRow.assignableId]['cws']) {
				resultJSON[currentRow.assignableId]['cws'] = {};
			}
			if (!resultJSON[currentRow.assignableId]['cws'][cwCoord]) {
				resultJSON[currentRow.assignableId]['cws'][cwCoord] = [];
			}
			//@todo Days can be extracted from an object and pushed directly into array
			resultJSON[currentRow.assignableId]['cws'][cwCoord].push({
				teamMemberId: currentRow.teamMemberId,
				days: currentRow.days
			});

			if (!resultJSON[currentRow.assignableId]['teamMemberDetail'][currentRow.teamMemberId]) {
				resultJSON[currentRow.assignableId]['teamMemberDetail'][currentRow.teamMemberId] = {
					teamMemberId: currentRow.teamMemberId,
					teamMemberName: currentRow.teamMemberName,
					teamMemberType: currentRow.teamMemberType
				}
			}

		});

		angular.forEach(resultJSON, function (project, assignableId) {
			resultJSON[assignableId]['cwsSum'] = {};
			angular.forEach(cwRange, function (cwCoord) {
				angular.forEach(resultJSON[assignableId]['teamMemberDetail'], function (teamMember, teamMemberId) {
					if (!resultJSON[assignableId]['teamMemberDetail'][teamMemberId]['cws']) {
						resultJSON[assignableId]['teamMemberDetail'][teamMemberId]['cws'] = {};
					}
					resultJSON[assignableId]['teamMemberDetail'][teamMemberId]['cws'][cwCoord] = 0;

				});

				if (!project['cws'][cwCoord]) {
					resultJSON[assignableId]['cws'][cwCoord] = [];
					resultJSON[assignableId]['cwsSum'][cwCoord] = 0;
				}
				else {
					resultJSON[assignableId]['cwsSum'][cwCoord] = 0;
					angular.forEach(resultJSON[assignableId]['cws'][cwCoord], function (teamMember) {
						resultJSON[assignableId]['cwsSum'][cwCoord] += teamMember.days;
						resultJSON[assignableId]['teamMemberDetail'][teamMember.teamMemberId]['cws'][cwCoord] = teamMember.days;

					})
				}
			});
		});
		console.log("ResultJson is: ", resultJSON);
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
		var fromCW = parseInt(fromCWString.split('_')[1]);
		var fromYear = parseInt(fromCWString.split('_')[0]);
		var toCW = parseInt(toCWString.split('_')[1]);
		var toYear = parseInt(toCWString.split('_')[0]);

		var resultArray = [];
		while ((fromCW <= toCW && fromYear === toYear) || (fromYear < toYear)) {
			var fromCWS = fromCW < 10 ? '0' + fromCW : fromCW;
			resultArray.push(fromYear + '_' + fromCWS);
			if (fromCW === 52) {
				if (moment('31.12.' + fromYear, 'DD.MM.YYYY').isoWeeks === 53) {
					fromCW++;
				}
				else {
					fromCW = 1;
					fromYear++;
				}
			}
			else if (fromCW === 53) {
				fromCW = 1;
				fromYear++;
			}
			else {
				fromCW++;
			}
		}
		return resultArray;
	}

});
