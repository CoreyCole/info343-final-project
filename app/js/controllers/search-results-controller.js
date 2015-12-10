'use strict';

/**
 * # SearchResultsCtrl
 */
angular.module('bellhappApp')
    .controller('SearchResultsCtrl', function ($scope, $stateParams, $firebaseArray, $state, rootRef) {
        $scope.results = $firebaseArray(rootRef.child("restaurants"));

        $scope.viewRestaurant = function(restaurant) {
            $state.go('restaurant-profile', {restaurantid: restaurant.$id});
        };

        $scope.results.$loaded().then(function() {
            var count = 0;
            angular.forEach($scope.results, function(restaurant) {
                if ( (!$stateParams.location || restaurant.location === $stateParams.location ) &&
                    (!$stateParams.food || restaurant.food === $stateParams.food ) &&
                    (!$stateParams.name || restaurant.name === $stateParams.name ) ) {
                    restaurant.show = true;
                    count++;
                } else {
                    restaurant.show = false;
                }
            });

            if (count === 0) {
                $scope.errorMessage = "No results found for your query!"
            }
        });
    });