'use strict';

/**
 * # MainCtrl
 */
angular.module('bellhappApp')
    .controller('MainCtrl', function ($scope, brand, $firebaseArray, rootRef, restaurantsRef, $state) {
        $scope.brand = brand;

        $scope.restaurants = $firebaseArray(restaurantsRef);

        $scope.search = function(location, food, name) {
            $state.go('search-results', {location: location, food: food, name:name});
        };

        //$scope.selectedLocation = "";
        //$scope.selectedFood = "";
        //$scope.selectedName = "";

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

        $scope.populate = function() {
            restaurantsRef.child("-K4bMCBfJkqlgK1LTNPz").child("orders").push({
                name: 'Cheese Pizza',
                price: 3.99,
                quantity: 2,
                tableID: "-K4bEvRhNhh3LCWhRLGW"
            });
        };

        $scope.getLocationMatches = function(query) {
            var matches = query ? $scope.restaurants.filter( filterForLocations(query.toLowerCase()) ) : locations;
            if (matches === null) {
                matches = [];
            }
            return matches;
        };

        function filterForLocations(query) {
            return function filterFn(restaurant) {
                return (restaurant.location.toLowerCase().indexOf(query) >= 0);
            };
        }

        $scope.getFoodMatches = function(query) {
            return query ? $scope.restaurants.filter( filterForFood(query.toLowerCase()) ) : food;
        };

        function filterForFood(query) {
            return function filterFn(restaurant) {
                return (restaurant.food.toLowerCase().indexOf(query) >= 0);
            };
        }

        $scope.getNameMatches = function (query) {
            return query ? $scope.restaurants.filter( filterForNames(query.toLowerCase()) ) : names;
        };

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