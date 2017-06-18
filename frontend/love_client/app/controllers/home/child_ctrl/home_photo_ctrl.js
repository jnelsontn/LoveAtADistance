'use strict';

app.controller('PhotoCtrl', function ($scope, $http, user_photos,
    Upload, apiUrl, RootFactory, profile, partner) {

    console.log('PhotoCtrl Here');

    console.log(user_photos);
    $scope.photos = user_photos;

    $scope.removePhoto = (id) => {
        $http({
            url: `${apiUrl}/photos/` + id,
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
                    'photo_name': file.name
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




