'use strict';

/**
 * # MenuItemInfoCtrl
 */
angular.module('bellhappApp')

.controller('MenuItemInfoCtrl', function ($scope, $mdDialog) {
    
    $scope.todos = [
      {
        name: 'Cheese Pizza',
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
});