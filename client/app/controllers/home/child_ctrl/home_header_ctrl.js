'use strict';

app.controller('HomeHeaderCtrl', function($scope) {

    // user
    let check_header_thumbnail = Object.keys(
        $scope.info.profile_photo).length;

    if (check_header_thumbnail < 1) {
         $scope.thumbnail_photo = false;
    } else {
        $scope.thumbnail_photo = $scope.info.profile_photo.profile;
        $scope.profile_photo_full = $scope.info.profile_photo.full_size;
    }

    // partner
    let check_partner_thumbnail = Object.keys(
        $scope.partner_info.profile_photo).length;

    if (check_partner_thumbnail < 1) {
         $scope.partner_thumbnail_photo = false;
    } else {
        $scope.partner_thumbnail_photo = $scope.partner_info.profile_photo.profile;
        $scope.partner_photo_full = $scope.partner_info.profile_photo.full_size;
    }

}); // end controller