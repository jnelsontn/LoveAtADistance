'use strict';

var app = angular.module('LoveClient', ['ui.router', 'ngCookies'])
    .constant('apiUrl', 'http://127.0.0.1:8000');

app.config( ($httpProvider, $interpolateProvider, $stateProvider, $urlRouterProvider) => {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');


    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login_register', {
        url: '/', // this loads a header with links to our child states
        templateUrl: 'app/templates/login_register/main.html',
        controller: "LoginCtrl"                                  
    })
        .state('login_register.login', {
                url: '^/login',
               templateUrl: 'app/templates/login_register/login.html',
        })
        .state('login_register.register', {
                url: '^/register',
                templateUrl: 'app/templates/login_register/register.html',
        })
    .state('check', {
        url: '/',
        templateUrl: 'app/templates/check_status/status.html',
        controller: 'CheckStatusCtrl'
    })
    .state('find_partner', { 
        url: '/',
        templateUrl: 'app/templates/find_partner/find_partner.html',
        controller: 'FindPartnerCtrl'
    })
    .state('waiting', { 
        url: '/',
        templateUrl: 'app/templates/check_status/waiting.html',
        controller: 'AwaitingResponseCtrl'
    })
    .state('home', {
        url: '/home',
        views: {
            '': {  // the main template will be placed here (relatively named)
                templateUrl: 'app/templates/home/home.html',
                controller: 'HomeCtrl'
            },
                // the child views will be defined here (absolutely named)
                'messages@home': { 
                    templateUrl: 'app/templates/home/home_messages.html'
                },
                'calendar@home': { 
                    templateUrl: 'app/templates/home/home_calendar.html'
                }
        }
    });


}); // end config


