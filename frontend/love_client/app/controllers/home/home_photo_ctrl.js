'use strict';

app.controller('PhotoCtrl', function ($scope, Upload, 
    apiUrl, RootFactory) {

    console.log('PhotoCtrl Here');

    // upload part of ng-file-upload
    $scope.uploadFiles = (file) => {
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
            }).then((res) => { file.result = res.data;
            }, (res) => { console.log(res.status + ': ' + res.data);
            }, (evt) => {
                file.progress = Math.min(100,
                    parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };


}); // end controller




