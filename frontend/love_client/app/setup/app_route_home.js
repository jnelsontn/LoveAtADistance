'use strict';

app.config(($stateProvider) => {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/templates/home/home_landing.html',
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
            })
        }
    })
    .state('home.main', {
        url: 'home',
        views: {
            '': {
                templateUrl: 'app/templates/home/home_main.html',
                controller: 'HomeCtrl'
            },
            'messages@home.main': { 
                templateUrl: 'app/templates/home/home_messages.html',
                controller: 'MessageCtrl'
            },
            'calendar@home.main': { 
                templateUrl: 'app/templates/home/home_calendar.html',
                controller: 'CalendarCtrl'
            }
            // 'photos@home.main': { 
            //     templateUrl: 'app/templates/home/home_photos.html',
            //     controller: 'PhotoCtrl'
            // }
        }
    })
    .state('home.photos', { 
        url: 'home/photos',
        templateUrl: 'app/templates/home/home_photos.html',
        controller: 'PhotoCtrl',
        resolve: {
            user_photos: (($http, apiUrl, RootFactory, profile) => {
                return $http({
                    url: `${apiUrl}/photos/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((user_photos) => { return user_photos.data.results; });
            })
        }
    })
    .state('home.important_numbers', { 
        url: 'home/contacts',
        templateUrl: 'app/templates/home/home_important_phone_numbers.html',
        controller: 'ImportantNumbersCtrl'
    })
    ;


});