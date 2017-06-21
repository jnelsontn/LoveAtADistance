'use strict';

app.controller('HomeMainCtrl', function($scope, 
    $state, $cookies, profile, user_profile, 
    partner) {

    // this controller handles supplying
    // initial user information to 'child'
    // controllers

    // logged in user
    $scope.profile = profile;
    $scope.info = user_profile;

    // their partner
    $scope.partner = partner;
    $scope.partner_info = partner.profile;

}); // end controller
