'use strict';

/**
 * # OrderConfirmCtrl
 */
angular.module('bellhappApp')
    .controller('OrderConfirmCtrl', function ($scope) {
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];
        
    });