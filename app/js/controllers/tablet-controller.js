'use strict';

/**
 * # TabletCtrl
 */
angular.module('bellhappApp')
    .controller('TabletCtrl', function ($scope, $firebaseArray, tablesRef, feedRef, currentTableRef, tableID) {
        $scope.tables = $firebaseArray(tablesRef);
        $scope.feed = $firebaseArray(feedRef);
        $scope.currentTableID = tableID;
        $scope.currentTableRef = currentTableRef;

        $scope.dismiss = function(notification) {
            if (notification.data === "assistance") {
                dismissSignal(notification);
            } else if (notification.data === "drinks") {
                dismissDrinks(notification);
            } else if (notification.data === "check") {
                dismissCheck(notification);
            }
        }

        function dismissSignal(notification) {
            notification.closed = true;
            $scope.feed.$save(notification);
            currentTableRef.update({
                signal: false
            });
        };

        function dismissDrinks(notification) {
            notification.closed = true;
            $scope.feed.$save(notification);
            currentTableRef.update({
                drinks: false
            });
        };

        function dismissCheck(notification) {
            notification.closed = true;
            $scope.feed.$save(notification);
            currentTableRef.update({
                check: false
            });
        };
    });