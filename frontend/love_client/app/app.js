'use strict';

var app = angular.module('LoveClient', ['ui.router', 'ngCookies'])
    .constant('apiUrl', 'http://127.0.0.1:8000');

app.config(($interpolateProvider, $stateProvider, $urlRouterProvider) => {

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('login_register', {
        url: '/',
        templateUrl: 'app/templates/login_register/main.html',
        controller: 'LoginCtrl',
        resolve: {
            user_logged_in: (($cookies, $state) => {
                let cookie = $cookies.get('authtoken');
                if (cookie) { 
                    $state.go('check'); 
                }
            }) 
        }                  
    })
    .state('login_register.login', {
        url: '^/login',
        templateUrl: 'app/templates/login_register/login.html'
    })
    .state('login_register.register', {
        url: '^/register',
        templateUrl: 'app/templates/login_register/register.html'
    })
   .state('check', {
        url: '/checking',
        controller: 'CheckStatusCtrl',
        resolve: { 
            profile: ((ProfileFactory) => {
                var profile = ProfileFactory.getApiProfile();
                ProfileFactory.setProfile(profile);
                return ProfileFactory.getProfile();
            })
        }
    })
   .state('find_partner', { 
        url: '/findpartner',
        templateUrl: 'app/templates/check_status/find_partner.html',
        controller: 'FindPartnerCtrl',
        parent: 'check'
    })
    .state('waiting', { 
        url: '/waiting',
        templateUrl: 'app/templates/check_status/waiting.html',
        controller: 'AwaitingResponseCtrl',
        parent: 'check'
    })
    .state('home', {
        url: '/home',
        resolve: {
            profile: ((ProfileFactory) => {
                let check = ProfileFactory.getProfile();
                if (!check) {
                    // only request data if we need it
                    let profile = ProfileFactory.getApiProfile();
                    ProfileFactory.setProfile(profile);
                }
                return ProfileFactory.getProfile();
            }),
            partner: (($http, apiUrl, RootFactory, profile) => {
                return $http({
                    url: `${apiUrl}/users/` + profile.relationship.partner,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((partner) => { return partner.data; });
            }),
        },
        views: {
            '': {
                templateUrl: 'app/templates/home/home.html',
                controller: 'HomeCtrl'
            },
                'messages@home': { 
                    templateUrl: 'app/templates/home/home_messages.html'
                },
                'calendar@home': { 
                    templateUrl: 'app/templates/home/home_calendar.html'
                }
        }
    });

}); // end config

app.run(($cookies, RootFactory) => {

    let cookie = $cookies.get('authtoken');
    if (cookie) {
        console.log('You have a cookie', cookie);
        RootFactory.setToken(cookie);
    }

});

