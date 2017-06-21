'use strict';

app.config(($stateProvider) => {

    $stateProvider
    .state('home', {
        url: '^/home',
        templateUrl: 'app/templates/home/home.html',
        controller: 'HomeNavBarCtrl',
        resolve: {
            profile: ((ProfileFactory) => {
                let profile = ProfileFactory.getApiProfile();
                ProfileFactory.setProfile(profile);
                return ProfileFactory.getProfile();
            }),
            user_profile: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/profiles/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((user_profile) => {
                    user_profile = user_profile.data.results[0];
                    return user_profile;
                });
            }),
            messages: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/messages/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((messages) => { return messages.data.results; });
            }),
            calendar: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/calendar/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((calendar) => { return calendar.data.results; });
            }),
            numbers: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/numbers/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((numbers) => { return numbers.data.results; });
            }),
            partner: (($http, apiUrl, profile, RootFactory) => {
                return $http({
                    url: `${apiUrl}/users/` + profile.relationship.partner + '/',
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((partner) => { 
                    partner = partner.data;
                    if (!partner.relationship) {
                        console.log(
                            'your relationship was removed, need to redirect');
                    }
                    return partner;
                });
            }),
        }
    })
    .state('home.main', {
        url: '^/home_main',
        views: {
            '': {
                templateUrl: 'app/templates/home/home_main.html',
                controller: 'HomeMainCtrl'
            },
            'header@home.main': { 
                templateUrl: 'app/templates/home/home_header.html',
                controller: 'HomeHeaderCtrl'
            },
            'messages@home.main': { 
                templateUrl: 'app/templates/home/home_messages.html',
                controller: 'MessageCtrl'
            },
            'calendar@home.main': { 
                templateUrl: 'app/templates/home/home_calendar.html',
                controller: 'CalendarCtrl'
            },
            'important_numbers@home.main': { 
                templateUrl: 'app/templates/home/home_important_phone_numbers.html',
                controller: 'ImportantNumbersCtrl'
            }
        }
    })
    .state('home.photos', { 
        url: '^/photos',
        templateUrl: 'app/templates/home/home_photos.html',
        controller: 'PhotoCtrl',
        resolve: {
            photos: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/photos/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((photos) => { return photos.data.results; });
            })
        }
    })
    .state('home.editprofile', { 
        url: '^/editprofile',
        templateUrl: 'app/templates/home/home_edit_profile.html',
        controller: 'EditProfileCtrl'
    });

});