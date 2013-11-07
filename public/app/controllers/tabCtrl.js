/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('tabCtrl', function tabCtrl($scope, $location, filterFilter) {

    $scope;

  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(tab) {
	  console.log(tab);
    angular.forEach(tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  };

	$scope.pageTabs = [];
    $scope.pageTabs =
    [
        { id: 1, active: true },
        { id: 2, active: false }
    ];
    $scope.$watch('pageTabs', function (xnew, xold) {
		$.each($scope.pageTabs, function(i, el) {
			if(xnew[i].active === true && xnew[i].active !== xold[i].active) {

			}
		})
    }, true);
});