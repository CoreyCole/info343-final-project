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
            restaurantsRef.child("-K4bMCBfJkqlgK1LTNPz").child("menu").push({
                "compliments": [ "Kid's Pancake", "Coffee", "House-made Bread" ],
                "description": "A colorful selection of our freshest fruit",
                "ingreedients": {
                    "commonAlergens": [ "wheat", "nuts" ],
                    "gluttenFree": false,
                    "ingreedientsList": [ "grapes", "oranges", "bananas", "strawberries" ]
                },
                "name": "SIDE OF FRESH FRUIT",
                "price": 4
            });
            //restaurantsRef.push({
            //    "food": "Organic",
            //    "location": "4130 Roosevelt Way NE Seattle, WA 98105",
            //    "locationLat": 47.658586,
            //    "locationLong": -122.313201,
            //    "name": "Portage Bay Cafe",
            //    "phone": "(206) 547-8230",
            //    "pictureUrl": "http://s3-media1.fl.yelpcdn.com/bphoto/k00pJk5dgmWGGGO2_osZQw/o.jpg",
            //    "ratings": {
            //        "-K4bMCBfJkqlgK1LTNP1": {
            //            "score": 4,
            //            "text": "LOCAL.  ORGANIC.  SUSTAINABLE."
            //        }
            //    }
            //});
            //restaurantsRef.child("tables").push(
            //    {
            //    "check": false,
            //    "color": "rgba(0,0,255,0.3)",
            //    "drinks": false,
            //    "number": 0,
            //    "orders": 0,
            //    "signal": false,
            //    "x": 10,
            //    "y": 50
            //    }
            //    {
            //        "check": false,
            //        "color": "rgba(0,0,255,0.3)",
            //        "drinks": false,
            //        "number": 1,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 85,
            //        "y": 50
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,0,255,0.3)",
            //        "drinks": false,
            //        "number": 2,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 160,
            //        "y": 50
            //    },
            //{
            //    "check": false,
            //    "color": "rgba(0,0,255,0.3)",
            //    "drinks": false,
            //    "number": 3,
            //    "orders": 0,
            //    "signal": false,
            //    "x": 235,
            //    "y": 50
            //},
            //    {
            //        "check": false,
            //        "color": "rgba(0,0,255,0.3)",
            //        "drinks": false,
            //        "number": 4,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 310,
            //        "y": 50
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(255,0,0,0.3)",
            //        "drinks": false,
            //        "number": 5,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 10,
            //        "y": 150
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(255,0,0,0.3)",
            //        "drinks": false,
            //        "number": 6,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 85,
            //        "y": 150
            //    },
            //    {
            //        "check": true,
            //        "color": "rgba(255,0,0,0.3)",
            //        "drinks": false,
            //        "number": 7,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 160,
            //        "y": 150
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(255,0,0,0.3)",
            //        "drinks": false,
            //        "number": 8,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 235,
            //        "y": 150
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(255,0,0,0.3)",
            //        "drinks": false,
            //        "number": 9,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 310,
            //        "y": 150
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(150,0,150,0.3)",
            //        "drinks": false,
            //        "number": 10,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 10,
            //        "y": 250
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(150,0,150,0.3)",
            //        "drinks": false,
            //        "number": 11,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 85,
            //        "y": 250
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(150,0,150,0.3)",
            //        "drinks": false,
            //        "number": 12,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 160,
            //        "y": 250
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(150,0,150,0.3)",
            //        "drinks": false,
            //        "number": 13,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 235,
            //        "y": 250
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(150,0,150,0.3)",
            //        "drinks": false,
            //        "number": 14,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 310,
            //        "y": 250
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,150,150,0.3)",
            //        "drinks": false,
            //        "number": 15,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 10,
            //        "y": 350
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,150,150,0.3)",
            //        "drinks": false,
            //        "number": 16,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 85,
            //        "y": 350
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,150,150,0.3)",
            //        "drinks": false,
            //        "number": 17,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 160,
            //        "y": 350
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,150,150,0.3)",
            //        "drinks": false,
            //        "number": 18,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 235,
            //        "y": 350
            //    },
            //    {
            //        "check": false,
            //        "color": "rgba(0,150,150,0.3)",
            //        "drinks": false,
            //        "number": 19,
            //        "orders": 0,
            //        "signal": false,
            //        "x": 310,
            //        "y": 350
            //    }
            //);
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