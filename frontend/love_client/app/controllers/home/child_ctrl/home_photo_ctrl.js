'use strict';

app.controller('PhotoCtrl', function ($scope, $http, photos,
    Upload, apiUrl, RootFactory, profile, user_profile, partner) {

    console.log('PhotoCtrl Here');

    console.log(photos);
    $scope.partner = partner;
    $scope.photos = photos;
    $scope.partner_photos = partner.photos;

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

    // upload part of ng-file-upload
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
                console.log('returned: ', res.data);
                $http({
                    url: `${apiUrl}/photos/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
                })
                .then((updated_photos) => {
                    updated_photos = updated_photos.data.results;
                    $scope.photos = updated_photos;
                    $scope.f = '';
                });
            }, (res) => { console.log(res.status + ': ' + res.data); },
            (evt) => {
                file.progress = Math.min(100,
                    parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

}); // end controller




