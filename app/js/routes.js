'use strict';

/**
 * Angular ui.router file
 */
angular.module('bellhappApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('search-results', {
                url: '/search/:location/:food/:name',
                templateUrl: 'views/search-results.html',
                controller: 'SearchResultsCtrl'
            })
            .state('restaurant-profile', {
                url: '/restaurant/:restaurantid',
                templateUrl: 'views/restaurant-profile.html',
                controller: 'RestaurantProfileCtrl'
            })
            .state('menu', {
                url: '/menu/:restaurantid',
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            })
            .state('tablet', {
                url: '/tablet/:restaurantid',
                templateUrl: 'views/tablet.html',
                controller: 'TabletCtrl'
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'views/cart.html',
                controller: 'CartCtrl'
            })
            .state('order-confirm', {
                url: '/cart/order-confirm',
                templateUrl: 'views/cart.html',
                controller: 'OrderConfirmCtrl'
            });


        $urlRouterProvider.otherwise('/');
    });
