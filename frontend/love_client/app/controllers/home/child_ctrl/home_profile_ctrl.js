'use strict';

app.controller('ProfileCtrl', function($scope, $http, 
    $state, Upload, apiUrl, RootFactory, profile, 
    user_profile) {
    
    console.log('ProfileCtrl Here');

    $scope.user = profile;
    $scope.profile = user_profile;

    console.log('home_profile - user: ', $scope.user);
    console.log('home_profile - profile: ', $scope.profile);
    
    let check_profile_photo = Object.keys(
        $scope.profile.profile_photo).length;

    if (check_profile_photo < 1) {
         $scope.profile_photo = false;
    } else {
        $scope.profile_photo = $scope.profile.profile_photo.medium_square_crop;
        $scope.profile_photo_full = $scope.profile.profile_photo.full_size;
    }


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

    // You can remove your relationship with them, they'll have to remove their
    // side too...we could always force this server-side
    $scope.disconnectPartner = () => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/relationships/` + $scope.user.relationship.id,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
        }).then((res) => {
            // Update the Dom to let the user know the cancel request was successful
            if (res.data) { 
                $scope.response = 'Successfully Canceled Request';
            }
            console.log(res.data);
            $state.go('find_partner');
        });
    };

    $scope.uploadProfilePhoto = (file) => {
        $scope.f = file;
        if (file) {
            file.upload = Upload.upload({
                url: `${apiUrl}/profiles/` + $scope.user.id + '/',
                method: 'PUT',
                headers: { 
                    'Authorization': 'Token ' + RootFactory.getToken() 
                },
                data: {
                    'profile_photo': file
                }
            }).then((res) => { 
                file.result = res.data;
                $http({
                    url: `${apiUrl}/photos/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
                })
                .then((updated_profile_photo) => {
                    console.log(updated_profile_photo);
                    $scope.profile_photo = $scope.profile.profile_photo.profile;
                    $scope.f = '';
                });
            }, (res) => { console.log(res.status + ': ' + res.data); },
            (evt) => {
                file.progress = Math.min(100,
                    parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };



});