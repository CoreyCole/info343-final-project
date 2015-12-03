'use strict';

/**
 * Main module of the application.
 */
angular.module('bellhappApp', [
        'ui.router',
        'firebase',
        'ngMaterial'
    ])
    .constant('firebaseUrl', 'https://info343-final.firebaseio.com/');
