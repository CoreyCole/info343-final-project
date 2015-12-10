'use strict';

/**
 * # MenuCtrl
 */
angular.module('bellhappApp')
    .controller('MenuCtrl', function ($scope, $mdDialog, $mdMedia, testRestaurantRef, $firebaseObject, rootRef) {
        $scope.restaurant = $firebaseObject(testRestaurantRef);

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
                templateUrl: 'views/cart.html',
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
        console.log($scope.menuItemFocus);

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
    function CartDialogController($scope, $mdDialog, $firebaseArray, rootRef, $stateParams) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        //eventually adding the cart to the list of orders in firebase
        $scope.orders = $firebaseArray(rootRef.child('restaurants').child($stateParams.restaurantid).child('orders'));

        //getting the items added to cart from local storage

        $scope.cart = [{name: 'Pepperoni Pizza', price: 5.99, quantity: 1}, {name: 'Cheese Pizza', price: 3.99, quantity: 2}
            , {name: 'Cheese Pizza', price: 3.99, quantity: 2}, {name: 'Cheese Pizza', price: 3.99, quantity: 2}
            , {name: 'Pepperoni Pizza', price: 5.99, quantity: 1} , {name: 'Pepperoni Pizza', price: 5.99, quantity: 1}
            , {name: 'Pepperoni Pizza', price: 5.99, quantity: 1}, {name: 'Pepperoni Pizza', price: 5.99, quantity: 1}];
        localStorage.setItem('cart', angular.toJson($scope.cart));
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];


        //total cost of cart items
        var preTax = 0;
        $scope.tax = 0;
        $scope.total = 0;

        calculate();

        //after the user clicks the remove button, we delete it from local storage
        $scope.remove = function(item){
            $scope.cart.splice($scope.cart.indexOf(item), 1);
            localStorage.setItem('cart', angular.toJson($scope.cart));
            preTax = preTax - (item.price * item.quantity);
            $scope.tax = tax(preTax);
            //empty();
        };

        //cost before tax to use to calculate tax
        function calculate() {
            console.log('cost before tax');
            console.log($scope.cart);
            $scope.cart.forEach(function (item) {
                console.log(item.price + " * " + item.quantity);
                preTax += item.price * item.quantity; //multiplying total cost of each item
            });
            $scope.tax = tax(preTax);
        }

        //calculate the tax
        function tax(preTax){
            console.log('tax');
            var tax = preTax * 0.095; //sales tax right now is 9.5%
            $scope.total = preTax + tax;
            return tax;
        }

        $scope.saveOrder = function(){
            $scope.cancel();
            $scope.cart.forEach(function (item){
                $scope.orders.$add({
                    tableID: $stateParams.tableid,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    fulfilled: false
                });
            });
        };


    }

