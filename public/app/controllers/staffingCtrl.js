<<<<<<< HEAD
/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('staffingCtrl', function staffingCtrl($scope, $location, staffingStorage) {

	$scope.cwRange = {};
	$scope.cwRange.cwStart = 1;
	$scope.cwRange.cwEnd = 2;

	staffingStorage.get().success(function(data, status, headers, config) {
		$scope.leads = data;
	});

	$scope.$watch('cwRange', function() {
		staffingStorage.get().success(function(data, status, headers, config) {
			$scope.leads = data;
		});
	}, true);
=======
/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('staffingCtrl', function staffingCtrl($scope, $location, staffingStorage) {

    $scope.leads;

    $scope.newTodo = '';
    $scope.editedTodo = null;
    $scope.filter = {};
    $scope.filter.cat = {};
	
	$scope.calenderweek;
	
	console.log($scope.calenderweek)
	
/*
    leadStorage.get().success(function (data, status, headers, config) {

    staffingStorage.get().success(function (data, status, headers, config) {
        $scope.leads = data;
    });

/*
    $scope.$watch('filter', function () {
        var filterState = filterStateToJson($scope.filter);

        leadStorage.get(filterState).success(function (data, status, headers, config) {
            $.each(data, function (index, lead) {
                // TODO magic numbers and magic Strings. These should be configurable. See leadsFilterCategoriesUI.json
                var scoreLabel = 'Low'; // default
                if (lead.score >= 80)
                    scoreLabel = 'High';
                else if (lead.score >= 45)
                    scoreLabel = 'Medium';
                lead.scoreLabel = scoreLabel;
                lead.scoreType = scoreLabel.toLowerCase();
            });

            // Give data to Map
            if (data) {
                adjustMapToFilterChange(data);
            }
            $scope.leads = data;

        });
    }, true);

    $scope.$watch('pagetabs', function () {
        $('.page-tabs li').removeClass('active');
        $('.page-tabs li').eq($scope.pagetabs - 1).addClass('active');
        $('div[class^="page-tab-"]').hide();
        $('.page-tab-' + $scope.pagetabs).show();
        resetMap(10);
    }, true);

    $scope.$watch('detailview', function () {
        if ($scope.detailview == 1) {
            $('.lead-overview').hide();
            $('.lead-detail').show();
        } else {
            $('.lead-detail').hide();
            $('.lead-overview').show();
        }
    }, true);

    function filterStateToJson(state) {
        var out = {};
        if (typeof state.searchTerm !== 'undefined') {
            out.searchTerm = state.searchTerm;
        }
        ;
        if ($.isEmptyObject(state.cat) === false) {
            out.categories = {};
            $.each(state.cat, function (key, val) {
                var zw = [];
                $.each(val, function (key2, val2) {
                    if (val2 === true) {
                        zw.push(key2);
                    }
                });
                var temp = {};
                temp[key] = zw;
                $.extend(out.categories, temp);
            });
        }
        return out;
    }
*/
>>>>>>> 62be097d9b0f37cdd0a66e41eac9a37292850f31
});