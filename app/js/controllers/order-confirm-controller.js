'use strict';

/**
 * # OrderConfirmCtrl
 * When should we erase local storage?
 */
angular.module('bellhappApp')
    .controller('OrderConfirmCtrl', function ($scope, $stateParams) {
        $scope.screen = window.innerHeight;

        $scope.restaurant = $stateParams.restaurantid;
        $scope.table = $stateParams.tableid;
    });

