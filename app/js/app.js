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
    .constant('tableID', '-K4bEvRhNhh3LCWhRLGW')
    .constant('testTableID', '-K4bEvRhNhh3LCWhRLGW')
    .constant('brand', 'bellhapp')
    .constant('restKey', 'chosenRest')
    .factory('currentTableRef', function(firebaseUrl, tableID) {
        var rootRef = new Firebase(firebaseUrl);
        var tablesRef = rootRef.child("tables");
        return tablesRef.child(tableID);
    })
    .factory('rootRef', function(firebaseUrl) {
        return new Firebase(firebaseUrl);
    })
    .factory('testRestaurantRef', function(rootRef, testRestaurantID) {
        return rootRef.child("restaurants").child(testRestaurantID);
    })
    .factory('tablesRef', function(rootRef, testRestaurantID) {
        return rootRef.child("restaurants").child(testRestaurantID).child('tables');
    })
    .factory('feedRef', function(rootRef, testRestaurantID) {
        return rootRef.child("restaurants").child(testRestaurantID).child('feed');
    })
    .factory('menuRef', function(rootRef, testRestaurantID) {
        return rootRef.child("restaurants").child(testRestaurantID).child('menu');
    });