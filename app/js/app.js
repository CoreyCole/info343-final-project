'use strict';

/**
 * Main module of the application.
 */
angular.module('bellhappApp', [
        'ui.router',
        'firebase',
        'ngMaterial'
    ])
    .constant('firebaseUrl', 'https://info343-final.firebaseio.com/')
    .constant('testRestaurantID', '-K4bMCBfJkqlgK1LTNPz')
    .constant('testTableID', '-K4bEvRhNhh3LCWhRLGW')
    .factory('rootRef', function(firebaseUrl) {
        return new Firebase(firebaseUrl);
    })
    .factory('tablesRef', function(rootRef, testRestaurantID) {
        return rootRef.child(testRestaurantID).child('tables');
    })
    .factory('feedRef', function(rootRef, testRestaurantID) {
        return rootRef.child(testRestaurantID).child('feed');
    });
