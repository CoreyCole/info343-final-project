'use strict';

/**
 * # MainCtrl
 */
angular.module('bellhappApp')
    .controller('MainCtrl', function ($scope, brand, rootRef, $state) {
        rootRef.update({
            food: [
                "Breakfast",
                "Thai",
                "Mexican",
                "Indian",
                "Restaurant"
            ]
        });

        //rootRef.child("restaurants").once("value", function(data) {
        //    angular.forEach(data.val(), function(obj) {
        //        locations.push(obj.location);
        //        food.push(obj.food);
        //        names.push(obj.name)
        //    });
        //});

        $scope.brand = brand;

        $scope.search = function(location, food, name) {
            $state.go('search-results', {location: location, food: food, name:name});
        };

        var locations = [];
        rootRef.child("locations").once("value", function(data) {
            locations = data.val();
        });

        var names = [];
        rootRef.child("names").once("value", function(data) {
            names = data.val();
        });

        var food = [];
        rootRef.child("food").once("value", function(data) {
            food = data.val();
        });

        $scope.getLocationMatches = function(query) {
            return query ? locations.filter( filterForLocations(query.toLowerCase()) ) : locations;
        };

        function filterForLocations(query) {
            return function filterFn(location) {
                return (location.toLowerCase().indexOf(query) >= 0);
            };
        }

        $scope.getFoodMatches = function(query) {
            return query ? food.filter( filterForFood(query.toLowerCase()) ) : food;
        };

        function filterForFood(query) {
            return function filterFn(food) {
                return (food.toLowerCase().indexOf(query) >= 0);
            };
        }

        $scope.getNameMatches = function (query) {
            return query ? names.filter( filterForNames(query.toLowerCase()) ) : names;
        };

        function filterForNames(query) {
            return function filterFn(name) {
                return (name.toLowerCase().indexOf(query) >= 0);
            };
        }
    });