'use strict';

/**
 * # OrderConfirmCtrl
 * When should we erase local storage?
 */
angular.module('bellhappApp')
    .controller('OrderConfirmCtrl', function ($scope) {
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];
        
    });