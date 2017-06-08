'use strict';

var app = angular.module('LoveClient', ['ui.router'])
    .constant('apiUrl', 'http://127.0.0.1:8000');
    
app.config(($interpolateProvider) => {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');
});

console.log('we are operating smoothly sir!');


app.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/home');

    var testState = {
        name: 'test',
        url: '/test',
        template: '<h3>It worked!</h3>'
    };

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/templates/home.html'
    })
    .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'app/templates/register.html'
    })
    .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'app/templates/login.html'
    })
    .state(testState);

});



