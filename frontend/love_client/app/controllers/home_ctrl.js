'use strict';

app.controller('HomeCtrl', function($scope, $http, $location, $rootScope, RootFactory, apiUrl) {
    console.log('HomeCtrl Here');
  
    // $http({
    //     url: `${apiUrl}/users/current`,
    //     headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
    // })
    // .then((profile) => {
    //     profile = profile.data;
        $scope.profile = $rootScope.profile;

        $scope.messages = $scope.profile.messages;
        $scope.calendar = $scope.profile.calendar;
        $scope.info = $scope.profile.profile;

        $scope.partner_id = $scope.profile.relationship.partner;

        console.log($scope.profile);

        // $scope.messages = profile.messages;
        // $scope.calendar = profile.calendar;
        // $scope.info = profile.profile;

        $http({
            url: `${apiUrl}/users/` + $scope.partner_id,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((partner) => {
            partner = partner.data;
            console.log(partner);
            $scope.partner = partner;
            $scope.partner_messages = partner.messages;
            $scope.partner_calendar = partner.calendar;
            $scope.partner_info = partner.profile;
        });

    // });

});




