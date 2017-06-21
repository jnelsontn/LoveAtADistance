'use strict';

app.controller('HomeMainCtrl', function($scope, 
    $state, $cookies, profile, user_profile, 
    partner) {

    console.log('HomeMainCtrl Here');

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
