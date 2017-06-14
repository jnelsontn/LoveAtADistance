'use strict';

app.controller('HomeCtrl', function($scope, profile, partner) {
    console.log('HomeCtrl Here');

    $scope.profile = profile;
    $scope.partner = partner;

    console.log('user: ', $scope.profile);
    console.log('partner: ', $scope.partner);

    // logged in user
    $scope.messages = $scope.profile.messages;
    $scope.calendar = $scope.profile.calendar;
    $scope.info = $scope.profile.profile;
    // their partner
    $scope.partner_messages = partner.messages;
    $scope.partner_calendar = partner.calendar;
    $scope.partner_info = partner.profile;

});




