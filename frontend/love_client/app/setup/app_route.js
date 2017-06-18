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
   .state('check', {
    /*
    Each time a User logs in, we check their relationship status.
    The resolve function allows the data to be downloaded before the
    page is rendered.
     */
        url: '/checking',
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
                // if a user tries logging on from /home, we 
                // see if their information is already stored
                // if not, then we retrieve it
                let check = ProfileFactory.getProfile();
                if (!check) {
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
                'navbar@home': { 
                    templateUrl: 'app/templates/home/home_navbar.html'
                },
                'messages@home': { 
                    templateUrl: 'app/templates/home/home_messages.html',
                    controller: 'MessageCtrl'
                },
                'calendar@home': { 
                    templateUrl: 'app/templates/home/home_calendar.html',
                    controller: 'CalendarCtrl'
                },
                'photos@home': { 
                    templateUrl: 'app/templates/home/home_photos.html',
                    controller: 'PhotoCtrl'
                }
        }
    });

}); // end config