'use strict';

app.controller('HomeCtrl', function($scope, $http, 
	profile, partner) {
	
    console.log('HomeCtrl Here');

    // logged in user
    $scope.profile = profile;
    $scope.info = $scope.profile.profile;

    // their partner
    $scope.partner = partner;
    $scope.partner_info = partner.profile;

    console.log('user: ', $scope.profile);
    console.log('partner: ', $scope.partner);

}); // end controller

