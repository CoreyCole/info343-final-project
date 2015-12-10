'use strict';

/**
 * # MenuCtrl
 */
angular.module('bellhappApp')
    .controller('MenuCtrl', function ($scope, $mdDialog, $mdMedia, $stateParams, testRestaurantRef, $firebaseObject, rootRef) {
        $scope.restaurant = $firebaseObject(rootRef.child("restaurants").child($stateParams.restaurantid));
        var tableRef = rootRef.child($stateParams.restaurantid).child($stateParams.tableid);
        $scope.restaurant.$loaded().then(function() {
            console.log($scope.restaurant);
        });
        $scope.order = function(menuItemId) {
            tableRef.child("orders").transaction(function(current_value) {
                return current_value + 1;
            });
        };

        $scope.sendHelpSignal = function() {
            tableRef.once("value", function(snapshot) {
                if (!snapshot.child("signal").val()) {
                    $scope.feed.$add({
                        tableNum: snapshot.child("number").val(),
                        data: "assistance",
                        alertType: "alert-danger",
                        closed: false
                    });
                    currentTableRef.update({
                        signal: true
                    });
                }
            });
        };

        $scope.sendDrinksSignal = function() {
            tableRef.once("value", function(snapshot) {
                if (!snapshot.child("drinks").val()) {
                    $scope.feed.$add({
                        tableNum: snapshot.child("number").val(),
                        data: "drinks",
                        alertType: "alert-info",
                        closed: false
                    });
                    currentTableRef.update({
                        drinks: true
                    });
                }
            });
        };

        $scope.sendCheckSignal = function() {
            tableRef.once("value", function(snapshot) {
                if (!snapshot.child("check").val()) {
                    $scope.feed.$add({
                        tableNum: snapshot.child("number").val(),
                        data: "check",
                        alertType: "alert-success",
                        closed: false
                    });
                    currentTableRef.update({
                        check: true
                    });
                }
            });
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        //$scope.restaurant.$loaded().then(function() {
        //    console.log($scope.restaurant.name);
        //});

        $scope.showAdvancedItemInfo = function(ev, item) {
            $scope.menuItemFocus = item;

            $mdDialog.show({
                controller: ItemDialogController,
                templateUrl: 'views/menu-item-info-test.html',
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen,
                scope: $scope,
                preserveScope: true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };

        $scope.showAdvancedCart = function(ev) {
            $mdDialog.show({
                controller: CartDialogController,
                templateUrl: 'views/cart-test.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };

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
    function ItemDialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    function CartDialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }