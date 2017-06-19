'use strict';

app.controller('ProfileCtrl', function($scope, $http, 
    apiUrl, RootFactory, profile, user_profile) {
    
    console.log('ProfileCtrl Here');

    $scope.user = profile;
    $scope.profile = user_profile;

    $scope.updateProfile = () => {
        // first we call the update to profile
        $http({
            url: `${apiUrl}/profiles/` + $scope.profile.user + '/',
            method: 'PUT',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'phone_number': $scope.profile.phone_number,
                // birth_date needs to be converted to ISO 8601 for Django
                // 'birth_date': $scope.profile.birth_date,
                'city': $scope.profile.city,
                'state': $scope.profile.state,
                'country': $scope.profile.country,
                'bio': $scope.profile.bio
            }
        }).then(() => {
            // refresh user profile....
            $http({
                url: `${apiUrl}/profiles/` + $scope.profile.user,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_profile_obj) => {
                updated_profile_obj = updated_profile_obj.data;
                $scope.profile = updated_profile_obj;
            });
        });
        // second call is to update the user
        $http({
            url: `${apiUrl}/users/` + $scope.user.id + '/',
            method: 'PUT',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'first_name': $scope.user.first_name,
                'last_name': $scope.user.last_name,
                'email': $scope.user.email
            }
        }).then(() => {
            $http({
                url: `${apiUrl}/users/` + $scope.user.id,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_user_obj) => {
                updated_user_obj = updated_user_obj.data;
                $scope.user = updated_user_obj;
            });
        });
    };


});