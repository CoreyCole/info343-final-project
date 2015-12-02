'use strict';

/**
 * Angular ui routes file
 */
angular.module('bellhappApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/search/:location/:food/:name', {
                templateUrl: 'views/search-results.html',
                controller: 'SearchResultsCtrl'
            })
            .when('/restaurant/:id', {
                templateUrl: 'views/restaurant-profile.html',
                controller: 'RestaurantProfileCtrl'
            })
            .when('/menu/:id', {
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            })

            .otherwise({redirectTo: '/'});
    }])
