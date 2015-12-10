'use strict';

/**
 * # MenuItemInfoCtrl
 */
angular.module('bellhappApp')

  .constant('cart', 'cart')
  .controller('MenuItemInfoCtrl', function ($scope, $mdDialog, cart, $mdToast, $animate) {
      

      $scope.products = [
        {
        name: "Pepperoni Pizza",
        price: 8,
        description: 'This is voted one of the best pizzas in town and is made with natural ingredients. To find' + 
          ' more information about this food item, click the ingredients button below',
        }
      ];

      $scope.toppings = [
        { name: 'Pepperoni', wanted: false },
        { name: 'Sausage', wanted: false },
        { name: 'Black Olives', wanted: false },
        { name: 'Green Peppers', wanted: false }
    	];

       // cart[objects] where objects is coffee type, quantity, base price
        $scope.cart = angular.fromJson(localStorage.getItem(cart)) || [];

      // saves the cart with the product information to the localstorage. 
      // cart auto updates.  
      $scope.addMenuItem = function(name, price, quantity, wanted) {
          $mdToast.show($mdToast.simple().
            content('This ' + name + ' has been added to your cart!').position($scope.getMsgPosition())
            .hideDelay(5000));
          $scope.cart.push({name: name, price: price, quantity: quantity});
          localStorage.setItem(cart, angular.toJson($scope.cart));
      };

      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getMsgPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };
  });