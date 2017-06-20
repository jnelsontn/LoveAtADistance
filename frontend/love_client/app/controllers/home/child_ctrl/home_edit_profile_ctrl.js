'use strict';

app.controller('EditProfileCtrl', function($scope, $http, 
    $state, Upload, apiUrl, RootFactory, profile, 
    user_profile, partner) {

    console.log('EditProfileCtrl Here');

    // logged in user
    $scope.profile = profile;
    $scope.info = user_profile;

    // their partner
    $scope.partner = partner;
    $scope.partner_info = partner.profile;

    console.log($scope.profile);
    console.log($scope.info);

    let check_profile_photo = Object.keys(
        $scope.info.profile_photo).length;

    if (check_profile_photo < 1) {
         $scope.profile_photo = false;
    } else {
        $scope.profile_photo = $scope.info.profile_photo.medium_square_crop;
        $scope.profile_photo_full = $scope.info.profile_photo.full_size;
    }

    $scope.updateProfile = () => {
        $http({
            url: `${apiUrl}/users/` + $scope.profile.id + '/',
            method: 'PUT',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'first_name': $scope.profile.first_name,
                'last_name': $scope.profile.last_name,
                'email': $scope.profile.email
            }
        }).then(() => {
            $http({
                url: `${apiUrl}/users/` + $scope.profile.id,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_user_obj) => {
                updated_user_obj = updated_user_obj.data;
                $scope.profile = updated_user_obj;
            });
        });
        // first we call the update to profile
        $http({
            url: `${apiUrl}/profiles/` + $scope.info.user + '/',
            method: 'PUT',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'phone_number': $scope.info.phone_number,
                'city': $scope.info.city,
                'state': $scope.info.state,
                'country': $scope.info.country,
                'bio': $scope.info.bio
            }
        }).then(() => {
            // refresh user profile....
            $http({
                url: `${apiUrl}/profiles/` + $scope.info.user,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_profile_obj) => {
                updated_profile_obj = updated_profile_obj.data;
                $scope.info = updated_profile_obj;
            });
        });
        // second call is to update the user

    };

    // You can remove your relationship with them, they'll have to remove their
    // side too...we could always force this server-side
    $scope.disconnectPartner = () => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/relationships/` + $scope.profile.relationship.id,
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
                url: `${apiUrl}/profiles/` + $scope.info.user + '/',
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
                    url: `${apiUrl}/profiles/` + $scope.info.user + '/',
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
                })
                .then((updated_profile_photo) => {
                    $scope.profile_photo = updated_profile_photo.data.profile_photo.medium_square_crop;
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