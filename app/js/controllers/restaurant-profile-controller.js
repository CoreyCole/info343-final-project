'use strict';

/**
 * # RestaurantProfileCtrl
 */
angular.module('bellhappApp')
    .controller('RestaurantProfileCtrl', function(firebaseUrl, $firebaseArray, $scope, rootRef, testRestaurantRef, restKey, $state) {
        $scope.restaurant = angular.fromJson(localStorage.getItem(restKey)) || [];
        console.log($scope.restaurant);

        $scope.refreshAll = function(){
            $scope.chosenRest = {};
            localStorage.setItem('chosenRest', angular.toJson($scope.chosenRest));
        };

        $scope.backToSearch = function(){
            $scope.refreshAll();
            $state.go('search-results');
        }

    });