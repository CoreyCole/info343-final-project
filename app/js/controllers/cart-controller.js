'use strict';

/**
 * # CartCtrl
 *
 * TO DO:
 * -add ability to change the quantity of item
 * -
 */
angular.module('bellhappApp')
    .controller('CartCtrl', function ($scope, $firebaseArray, rootRef) {
        //eventually adding the cart to the list of orders in firebase
        $scope.orders = $firebaseArray(rootRef);

        //getting the items added to cart from local storage
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];

        //after the user clicks the remove button, we delete it from local storage
        $scope.remove = function(item){
            $scope.cart.splice($scope.cart.indexOf(item), 1);
            localStorage.setItem('cart', angular.toJson($scope.cart));
        };

        //total cost of cart items
        var total;
        var tax;

        //cost before tax to use to calculate tax
        function calculate() {
            $scope.cart.forEach(function (item) {
                total += item.price * item.quantity; //multiplying total cost of each item
            });
            return total;
        }

        //calculate the tax
        $scope.tax = function(){
            var cost = calculate();
            tax = cost * 0.095; //sales tax right now is 9.5%
            return tax;
        };

        //total cost of menu items
        $scope.totalCost = function(){
            return total + tax;
        };

        $scope.saveOrder = function(){
            $scope.cart.forEach(function (item){
                $scope.orders.$add({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.cart.price
                });
            });
        };

    });