'use strict';

/**
 * # MenuCtrl
 */
angular.module('bellhappApp')
    .controller('MenuCtrl', function ($scope, $mdDialog, $mdMedia, $mdToast, $stateParams, testRestaurantRef, $firebaseObject, $firebaseArray, rootRef) {

        //firebaseObject reference to the current restaurant
        $scope.restaurant = $firebaseObject(rootRef.child("restaurants").child($stateParams.restaurantid));

        //firebaseArray reference to the feed array of the tablet
        $scope.feed = $firebaseArray(rootRef.child("restaurants").child($stateParams.restaurantid).child("feed"));

        //firebase table references
        var tableRef = rootRef.child("restaurants").child($stateParams.restaurantid).child("tables").child($stateParams.tableid);
        var table = $firebaseObject(rootRef.child("restaurants").child($stateParams.restaurantid).child("tables").child($stateParams.tableid));

        $scope.table = table;
        table.$bindTo($scope, "table");

        //restaurant id from the url state paramters
        $scope.restaurantID = $stateParams.restaurantid;

        // cart[objects] where objects is coffee type, quantity, base price
        $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];

        //adds given item to cart in local storage from the menu
        $scope.addToCart = function(name, price, quantity, wanted) {
            $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];
            $mdToast.show($mdToast.simple().
                content('This ' + name.name + ' has been added to your cart!').position($scope.getMsgPosition())
                .hideDelay(5000));
            $scope.cart.push({name: name.name, price: name.price, quantity: 1});
            localStorage.setItem('cart', angular.toJson($scope.cart));
        };

        // saves the cart with the product information to the localstorage.
        // cart auto updates.
        // from the menu item info
        $scope.addMenuItem = function(name, price, quantity, wanted) {
            $scope.cart = angular.fromJson(localStorage.getItem('cart')) || [];
            $mdToast.show($mdToast.simple().
                content('This ' + name + ' has been added to your cart!').position($scope.getMsgPosition())
                .hideDelay(5000));
            $scope.cart.push({name: name, price: price, quantity: quantity});
            localStorage.setItem('cart', angular.toJson($scope.cart));
        };

        //notification position of the toast
        $scope.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        //returns the desired location for the toast
        $scope.getMsgPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        //increments the orders variable on the table in the tablet view
        $scope.order = function(menuItemId) {
            tableRef.child("orders").transaction(function(current_value) {
                return current_value + 1;
            });
        };

        //sets the help signal for the current table to true (does not toggle)
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

        //sets the drinks signal for the current table to true (does not toggle)
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

        //sets the check signal for the current table to true (does not toggle)
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

        //opens modal
        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        //opens item info modal and passes scope to MenuItemInfoCtrl
        $scope.showAdvancedItemInfo = function(ev, item) {
            //stored clicked menu item in scope for MenuItemInfoCtrl to use
            $scope.menuItemFocus = item;

            //opens the modal
            $mdDialog.show({
                controller: MenuItemInfoCtrl,
                templateUrl: 'views/menu-item-info.html',
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen,
                scope: $scope, //passes full scope to modal
                preserveScope: true //preserves scope after closing modal
            });

            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };

        //opens cart modal
        $scope.showAdvancedCart = function(ev) {
            $mdDialog.show({
                controller: CartCtrl,
                templateUrl: 'views/cart.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen
            });

            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };
    });

    function CartCtrl($scope, $mdDialog, $firebaseArray, $firebaseObject, rootRef, $stateParams) {
        //modal functions
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.restaurant = $stateParams.restaurantid;
        $scope.table = $stateParams.tableid;

        //eventually adding the cart to the list of orders in firebase
        $scope.orders = $firebaseArray(rootRef.child('restaurants').child($stateParams.restaurantid).child('orders'));

        $scope.feed = $firebaseArray(rootRef.child("restaurants").child($stateParams.restaurantid).child("feed"));

        var obj = $firebaseObject(rootRef.child('restaurants').child($stateParams.restaurantid).child('tables').child($scope.table));
        $scope.tableRef = obj;
        obj.$bindTo($scope, "tableRef");

        //getting the items added to cart from local storage

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
            $scope.cart.forEach(function (item) {
                preTax += item.price * item.quantity; //multiplying total cost of each item
            });
            $scope.tax = tax(preTax);
        }

        //calculate the tax
        function tax(preTax){
            var tax = preTax * 0.095; //sales tax right now is 9.5%
            $scope.total = preTax + tax;
            return tax;
        }

        //saves order from local storage to firebase
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

                $scope.feed.$add({
                    alertType: "alert-danger alert-custom",
                    closed: false,
                    data: "order",
                    tableNum: $scope.tableRef.number,
                    tableID: $scope.table,
                    size: $scope.cart.length
                });
                $scope.tableRef.orders = parseInt($scope.tableRef.orders) + 1;
            });
            localStorage.clear();
        };

    }

    function MenuItemInfoCtrl ($scope, $mdDialog, $mdMedia, $mdToast, $animate) {
        //modal functions
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }


