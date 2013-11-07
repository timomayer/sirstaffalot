/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
staffalotApp.controller('staffingPostCtrl', function TodoCtrl($scope, $http) {

    $scope.Assignable = {};
    console.log('hello1')
      $scope.createStaffing = function() {
        $http({
            method : 'POST',
            url : '/insert/assignable',
            data : $scope.Assignable
        }) .success(function (res) {
            console.log('asd');
        });
       }
      });
