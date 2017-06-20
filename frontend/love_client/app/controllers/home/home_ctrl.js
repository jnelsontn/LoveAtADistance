'use strict';

app.controller('HomeCtrl', function($scope, profile, 
    user_profile, partner) {

    console.log('HomeCtrl Here');

    // logged in user
    $scope.profile = profile;
    $scope.info = user_profile;

    // their partner
    $scope.partner = partner;
    $scope.partner_info = partner.profile;

    console.log('user: ', $scope.profile);
    console.log('user info', $scope.info);
    console.log('partner: ', $scope.partner);
    console.log('partner_info:', $scope.partner_info);

}); // end controller
