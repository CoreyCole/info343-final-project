'use strict';

/**
 * # RestaurantProfileCtrl
 */
angular.module('bellhappApp')
    .controller('RestaurantProfileCtrl', function (firebaseUrl, $firebaseArray, $scope, rootRef,
                                                   testRestaurantRef, restKey, $state, $firebaseObject,
                                                   restaurantsRef, $stateParams) {

        $scope.restaurants = $firebaseArray(restaurantsRef);

        $scope.restaurantid = $stateParams.restaurantid;

        $scope.allReviews = [];

        // shows content
        $scope.showContent = function () {
            $('#allcontent').show();
        };

        // hides content
        $scope.hideContent = function () {
            $('#allcontent').hide();
        };
        $scope.hideContent();
        $scope.restaurants.$loaded()
            .then(function () {
                $scope.restaurant = $scope.restaurants.$getRecord($stateParams.restaurantid);
                $scope.renderAll($scope.restaurant);
            });

        $scope.renderAll = function () {
            $scope.pictureUrl = $scope.restaurant.pictureUrl;
            $scope.name = $scope.restaurant.name;

            $scope.ratings = $scope.restaurant.ratings;

            $scope.ratings = Object
                .keys($scope.ratings)
                .map(function (key) {
                    return $scope.ratings[key]
                });

            $scope.avgRating = 0;
            var total = 0;
            $scope.ratings.forEach(function (rating) {
                $scope.allReviews.push(rating);
                total += rating.score;
            });
            $scope.avgRating = total / Math.round($scope.allReviews.length);
            $scope.stars = [];
            for ( var i = 0; i < $scope.avgRating; i++) {
                $scope.stars.push(1);
            }
            $scope.showContent();
        };

        $scope.backToSearch = function () {
            $state.go('search-results');
        };
        $scope.viewMenu = function (restaurant) {
            $state.go('menu', {restaurantid: restaurant.$id, tableid: "-K5CoCIZGX_y52JZeYZR"});
        }

    });