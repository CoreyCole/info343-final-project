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
                url: '/restaurant/:id',
                templateUrl: 'views/restaurant-profile.html',
                controller: 'RestaurantProfileCtrl'
            })
            .state('menu', {
                url: '/menu/:id',
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            });

        $urlRouterProvider.otherwise('/');
    });
