sirstaffalot
============
### Communication between 2 controllers
============

var myModule = angular.module('myModule', []);

myModule.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

function ControllerZero($scope) {
    $scope.handleClick = function(msg) {
        $scope.$emit('handleEmit', {message: msg});
    };
}

function ControllerOne($scope) {
    $scope.$on('handleBroadcast', function(event, args) {
        $scope.message = 'ONE: ' + args.message;
    });        
}

function ControllerTwo($scope) {
    $scope.$on('handleBroadcast', function(event, args) {
        $scope.message = 'TWO: ' + args.message;
    });
}

ControllerZero.$inject = ['$scope'];

ControllerOne.$inject = ['$scope'];

ControllerTwo.$inject = ['$scope'];
