'use strict';

app.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login_register', {
        url: '',
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
    /*
    Each time a User logs in, we check their relationship status.
    The resolve function allows the data to be downloaded before the
    page is rendered.
     */
        url: '/check',
        controller: 'CheckStatusCtrl',
        resolve: { 
            profile: ((ProfileFactory) => {
                let profile = ProfileFactory.getApiProfile();
                ProfileFactory.setProfile(profile);
                return ProfileFactory.getProfile();
            })
        }
    })
   .state('find_partner', { 
        url: '^/find_partner',
        templateUrl: 'app/templates/check_status/find_partner.html',
        controller: 'FindPartnerCtrl',
        parent: 'check'
    })
    .state('awaiting_response', { 
        url: '^/awaiting_response',
        templateUrl: 'app/templates/check_status/awaiting_response.html',
        controller: 'AwaitingResponseCtrl',
        parent: 'check'
    });

}); // end route config