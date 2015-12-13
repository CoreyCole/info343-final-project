'use strict';

/**
 * # MainCtrl
 */
angular.module('bellhappApp')
    .controller('MainCtrl', function ($scope, brand, $firebaseArray, rootRef, restaurantsRef, $state) {
        $scope.brand = brand;

        $scope.restaurants = $firebaseArray(restaurantsRef);

        $scope.screen = window.innerHeight;

        var locations = [];
        var names = [];
        var food = [];
        $scope.restaurants.$loaded().then(function() {
            angular.forEach($scope.restaurants, function(obj) {
                console.log(obj);
                locations.push(obj.location);
                names.push(obj.name);
                food.push(obj.food);
            });
        });

        console.log(food);

        //changes the view to the search results page given the inputs
        $scope.search = function(location, food, name) {
            $state.go('search-results', {location: location, food: food, name:name});
        };

        //returns matches to the angular material auto complete input
        $scope.getLocationMatches = function(query) {
            var matches = query ? $scope.restaurants.filter( filterForLocations(query.toLowerCase()) ) : locations;
            if (matches === null) {
                matches = [];
            }
            return matches;
        };

        //filter used by getLocationMatches
        function filterForLocations(query) {
            return function filterFn(restaurant) {
                return (restaurant.location.toLowerCase().indexOf(query) >= 0);
            };
        }

        //returns matches to the angular material auto complete input
        $scope.getFoodMatches = function(query) {
            return query ? $scope.restaurants.filter( filterForFood(query.toLowerCase()) ) : food;
        };

        //filter used by getFoodMatches
        function filterForFood(query) {
            return function filterFn(restaurant) {
                return (restaurant.food.toLowerCase().indexOf(query) >= 0);
            };
        }

        //returns matches to the angular material auto complete input
        $scope.getNameMatches = function (query) {
            return query ? $scope.restaurants.filter( filterForNames(query.toLowerCase()) ) : names;
        };

        //filter used by getNameMatches
        function filterForNames(query) {
            return function filterFn(restaurant) {
                console.log(!$scope.selectedLocation || $scope.selectedLocation.location === restaurant.location);
                console.log(!$scope.selectedFood || $scope.selectedFood.food === restaurant.food);
                return ( (restaurant.name.toLowerCase().indexOf(query) >= 0 ) &&
                        (!$scope.selectedLocation || $scope.selectedLocation.location === restaurant.location) &&
                        (!$scope.selectedFood || $scope.selectedFood.food === restaurant.food) );
            };
        }
    });