'use strict';

/**
 * # MenuCtrl
 */
angular.module('bellhappApp')
    .controller('MenuCtrl', function ($scope, $mdDialog, $mdMedia, $mdToast, $stateParams, testRestaurantRef, $firebaseObject, $firebaseArray, rootRef) {
        $scope.restaurant = $firebaseObject(rootRef.child("restaurants").child($stateParams.restaurantid));
        $scope.feed = $firebaseArray(rootRef.child("restaurants").child($stateParams.restaurantid).child("feed"));
        var tableRef = rootRef.child("restaurants").child($stateParams.restaurantid).child("tables").child($stateParams.tableid);
        var table = $firebaseObject(rootRef.child("restaurants").child($stateParams.restaurantid).child("tables").child($stateParams.tableid));
        $scope.table = table;
        table.$bindTo($scope, "table");

        // cart[objects] where objects is coffee type, quantity, base price
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];

        $scope.addToCart = function(name, price, quantity, wanted) {
            $mdToast.show($mdToast.simple().
                content('This ' + name.name + ' has been added to your cart!').position($scope.getMsgPosition())
                .hideDelay(5000));
            $scope.cart.push({name: name.name, price: name.price, quantity: 1});
            localStorage.setItem('cart', angular.toJson($scope.cart));
        };

        // saves the cart with the product information to the localstorage.
        // cart auto updates.
        $scope.addMenuItem = function(name, price, quantity, wanted) {
            $mdToast.show($mdToast.simple().
                content('This ' + name + ' has been added to your cart!').position($scope.getMsgPosition())
                .hideDelay(5000));
            $scope.cart.push({name: name, price: price, quantity: quantity});
            localStorage.setItem('cart', angular.toJson($scope.cart));
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

        $scope.order = function(menuItemId) {
            tableRef.child("orders").transaction(function(current_value) {
                return current_value + 1;
            });
        };

        $scope.sendHelpSignal = function() {
            if (!$scope.table.signal) {
                $scope.feed.$add({
                    tableNum: $scope.table.number,
                    tableID: $scope.table.$id,
                    data: "help",
                    alertType: "alert-danger",
                    closed: false
                });
                $scope.table.signal = true;
            }
        };

        $scope.sendDrinksSignal = function() {
            if (!$scope.table.drinks) {
                $scope.feed.$add({
                    tableNum: $scope.table.number,
                    tableID: $scope.table.$id,
                    data: "drinks",
                    alertType: "alert-info",
                    closed: false
                });
                $scope.table.drinks = true;
            }
        };

        $scope.sendCheckSignal = function() {
            if (!$scope.table.check) {
                $scope.feed.$add({
                    tableNum: $scope.table.number,
                    tableID: $scope.table.$id,
                    data: "check",
                    alertType: "alert-success",
                    closed: false
                });
                $scope.table.check = true;
            }
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

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
    
    function ItemDialogController($scope, $mdDialog, $mdMedia, $mdToast, $animate) {

      // // cart[objects] where objects is coffee type, quantity, base price
      //  $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];
      //
      //// saves the cart with the product information to the localstorage.
      //// cart auto updates.
      //$scope.addMenuItem = function(name, price, quantity, wanted) {
      //    $mdToast.show($mdToast.simple().
      //      content('This ' + name + ' has been added to your cart!').position($scope.getMsgPosition())
      //      .hideDelay(5000));
      //    $scope.cart.push({name: name, price: price, quantity: quantity});
      //    localStorage.setItem('cart', angular.toJson($scope.cart));
      //};
      //
      //$scope.toastPosition = {
      //  bottom: false,
      //  top: true,
      //  left: false,
      //  right: true
      //};
      //
      //$scope.getMsgPosition = function() {
      //  return Object.keys($scope.toastPosition)
      //    .filter(function(pos) { return $scope.toastPosition[pos]; })
      //    .join(' ');
      //};

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

        $scope.showIngredientItemInfo = function(ev, item) {
            $scope.menuItemFocus = item;
            console.log($scope.menuItemFocus);
            $mdDialog.show({
                controller: ItemIngredientsDialogController,
                templateUrl: 'views/ingredients-info.html',
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

