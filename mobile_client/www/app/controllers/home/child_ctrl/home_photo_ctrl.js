'use strict';

app.controller('PhotoCtrl', function ($scope, $http, photos,
    Upload, apiUrl, RootFactory, profile, user_profile, partner) {

    $scope.partner = partner;
    $scope.photos = photos;
    $scope.partner_photos = partner.photos;

    // remove a specific photo from the list of user's photos
    $scope.removePhoto = (id) => {
        $http({
            url: `${apiUrl}/photos/` + id + '/',
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then(() => {

            $http({
                url: `${apiUrl}/photos/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_photos) => {
                updated_photos = updated_photos.data.results;
                $scope.photos = updated_photos;
            });
        });
    };

    // add a photo to our photo gallery
    $scope.uploadPhoto = (file) => {
        $scope.f = file;
        if (file) {
            file.upload = Upload.upload({
                url: `${apiUrl}/photos/`,
                method: 'POST',
                headers: { 
                    'Authorization': 'Token ' + RootFactory.getToken() 
                },
                data: {
                    'photo': file,
                }
            }).then((res) => { 
                file.result = res.data;
                $http({
                    url: `${apiUrl}/photos/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
                })
                .then((updated_photos) => {
                    updated_photos = updated_photos.data.results;
                    $scope.photos = updated_photos;
                    $scope.f = '';
                });
            }, (res) => { },
            (evt) => {
                file.progress = Math.min(100,
                    parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

}); // end controller




