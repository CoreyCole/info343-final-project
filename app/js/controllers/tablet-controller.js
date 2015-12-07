'use strict';

/**
 * # TabletCtrl
 */
angular.module('bellhappApp')
    .controller('TabletCtrl', function ($scope, $firebaseArray, tablesRef, feedRef) {
        $scope.tables = $firebaseArray(tablesRef);
        $scope.feed = $firebaseArray(feedRef);
    });