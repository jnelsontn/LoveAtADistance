'use strict';

var app = angular.module('LoveClient', ['ui.router', 'ngCookies'])
    .constant('apiUrl', 'http://127.0.0.1:8000');

app.config(function($httpProvider, $interpolateProvider) {
    $httpProvider.defaults.withCredentials = true;

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');
});

app.run(function($http, $cookies, RootFactory ) {
    // No Clue what I am doing, seeing if i can keep myself
    // logged in... need to move on from this
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

    console.log( $cookies.getAll('token') );
    let token = $cookies.get('token');
    if (token) {
        RootFactory.setToken(token);
    }

});

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
        controller: 'HomeCtrl',
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



