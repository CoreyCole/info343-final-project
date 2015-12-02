'use strict';

/**
 * # IndexCtrl
 */
angular.module('bellhappApp')
    .factory('brand', function($http) {
        return $http.get('data/master-data.json')
            .then(function(results) {
                return results.data.brand;
            });
    })
    .controller('IndexCtrl', function ($scope, $window, $timeout, $mdSidenav, $log, brand) {
        $scope.scrolledDown = false;
        brand.then(function(data) {
            $scope.brand = data;
        });

        //top bar disappears on scroll down
        var windowEl = angular.element($window);
        windowEl.on('scroll', function() {
            $scope.scrolledDown = true;
        });

        windowEl.on('screenTop == 0', function() {
            $scope.scrolledDown = false;
        });

        $scope.toggleLeft = buildDelayedToggler('left');

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
    })
