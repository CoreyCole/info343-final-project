'use strict';

/**
 * # CartCtrl
 */
angular.module('bellhappApp', ['firebase'])
    .controller('CartCtrl', function ($scope, firebaseUrl, $firebaseArray) {
        var data = new Firebase(firebaseUrl);
        $scope.cart = $firebaseArray(data);
        

    });