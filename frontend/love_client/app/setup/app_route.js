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
            }),
            notifications: (($http, apiUrl, RootFactory, profile) => {
                return $http({
                    url: `${apiUrl}/notifications/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((notifications) => { return notifications.data; });
            }),
        }
    })
   .state('find_partner', { 
        url: 'findpartner',
        templateUrl: 'app/templates/check_status/find_partner.html',
        controller: 'FindPartnerCtrl',
        parent: 'check'
    })
    .state('waiting', { 
        url: 'waiting',
        templateUrl: 'app/templates/check_status/waiting.html',
        controller: 'AwaitingResponseCtrl',
        parent: 'check'
    });

}); // end route config