'use strict';

/**
 * # RestaurantProfileCtrl
 */
angular.module('bellhappApp')
    .controller('RestaurantProfileCtrl', function(firebaseUrl, $firebaseArray, $scope, rootRef, testRestaurantRef, restKey, $state) {

        $scope.renderAll = function(){
            $scope.restaurant = angular.fromJson(localStorage.getItem(restKey)) || [];
            console.log($scope.restaurant);

            $scope.pictureUrl = $scope.restaurant.pictureUrl;
            $scope.name = $scope.restaurant.name;
            console.log($scope.name);

            $scope.ratings = $scope.restaurant.ratings;
            console.log($scope.ratings);

            $scope.ratings = Object
                .keys($scope.ratings)
                .map(function (key) {
                    return $scope.ratings[key]
                });
            console.log($scope.ratings);

            $scope.avgRating = 0;
            var count = 0;
            var total = 0;
            $scope.ratings.forEach(function(rating){
                console.log(rating);
                count ++;
                total += rating.score;
                console.log(total);
                $scope.avgRating = total / count;
            });
            console.log($scope.avgRating);

        };

        $scope.renderAll();

        $scope.refreshAll = function(){
            $scope.chosenRest = {};
            localStorage.setItem('chosenRest', angular.toJson($scope.chosenRest));
        };

        $scope.backToSearch = function(){
            $scope.refreshAll();
            $state.go('search-results');
        };

        $scope.viewMenu = function(restaurant){
            $state.go('menu', {restaurantid: restaurant.$id, tableid: "-K5CoCIZGX_y52JZeYZR"});
        }

});