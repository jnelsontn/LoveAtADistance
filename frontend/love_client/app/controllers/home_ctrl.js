'use strict';

app.controller('HomeCtrl', function($scope, $http, $location, RootFactory, $rootScope, apiUrl) {
    console.log('HomeCtrl Here');
    console.log ('Do we have a token: ', RootFactory.getToken() );
  
    $http({
        url: `${apiUrl}/users/current`,
        headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
    })
    .then( (profile) => {
        profile = profile.data;
        console.log(profile);
        $scope.profile = profile;
        $scope.messages = profile.messages;
        $scope.calendar = profile.calendar;
        $scope.moreinfo = profile.profile;

        let connect = profile.myuser_connection;
        if (connect.connected_user && (connect.are_they_connected == 1)) {
            console.log('we have a relationship');
            $scope.inRelationship = true;
            $scope.partner_uid = connect.connected_user;
            console.log($scope.partner_uid);
        }

        $http({
            url: `${apiUrl}/users/` + $scope.partner_uid,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then( (bae) => {
            $scope.partner = bae.data;
            console.log(bae.data);
            }
        );
    }).then( () => console.log('still here') );


});





