'use strict';

app.config(($stateProvider, $urlRouterProvider) => {

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
    // We pull the user's profile on login to check whether
    // there's a relationship
   .state('check', {
        url: '^/check',
        templateUrl: 'app/templates/check_status/home.html',
        controller: 'CheckStatusCtrl',
        resolve: { 
            profile: ((ProfileFactory) => {
                let profile = ProfileFactory.getApiProfile();
                ProfileFactory.setProfile(profile);
                return ProfileFactory.getProfile();
            })
        }
    })
    .state('check.find_partner', { 
        url: '^/find_partner',
        templateUrl: 'app/templates/check_status/find_partner.html',
        controller: 'FindPartnerCtrl'
    })
    .state('check.awaiting_response', { 
        url: '^/awaiting_response',
        templateUrl: 'app/templates/check_status/awaiting_response.html',
        controller: 'AwaitingResponseCtrl'
    });

}); // end route config


