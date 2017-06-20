'use strict';

app.config(($stateProvider) => {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/templates/home/home.html',
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
            partner: (($http, apiUrl, profile, RootFactory) => {
                return $http({
                    url: `${apiUrl}/users/` + profile.relationship.partner,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((partner) => { 
                    partner = partner.data;
                    return partner;
                });
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
        } // end views
    })
    .state('home.photos', { 
        url: 'home/photos',
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
    .state('home.important_numbers', { 
        url: 'home/contacts',
        templateUrl: 'app/templates/home/home_important_phone_numbers.html',
        controller: 'ImportantNumbersCtrl',
        resolve: {
            numbers: (($http, apiUrl, RootFactory) => {
                return $http({
                    url: `${apiUrl}/numbers/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                }).then((numbers) => { return numbers.data.results; });
            })
        }
    })
    .state('home.profile', { 
        url: 'home/profile',
        templateUrl: 'app/templates/home/profile/home_profile.html',
        controller: 'ProfileCtrl',
    })
    .state('home.editprofile', { 
        url: 'home/profile/editprofile',
        templateUrl: 'app/templates/home/profile/home_edit_profile.html',
        controller: 'ProfileCtrl'
    });

});