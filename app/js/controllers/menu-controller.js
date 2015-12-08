'use strict';

/**
 * # MenuCtrl
 */
angular.module('bellhappApp')
    .controller('MenuCtrl', function ($scope, testRestaurantRef, $firebaseObject, rootRef) {
        $scope.restaurant = $firebaseObject(testRestaurantRef);

        $scope.restaurant.$loaded().then(function() {
            console.log($scope.restaurant.name);
        });

        $scope.populate1 = function() {
            rootRef.child("restaurants").child("menu").push({
                name: "",
                description: "",
                price: 5,
                compliments: [
                    "ID1",
                    "ID2",
                    "ID3"
                ],
                ingreedients: {
                    gluttenFree: false,
                    commonAlergens: [
                        "wheat",
                        "nuts"
                    ],
                    ingreedientsList : [
                        "flour",
                        "milk",
                        "eggs",
                        "water",
                        "high fructose corn syrup"
                    ]
                }
            });
        };
    });