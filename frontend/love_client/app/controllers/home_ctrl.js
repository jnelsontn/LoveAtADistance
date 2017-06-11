'use strict';

app.controller('HomeCtrl', function($scope, $http, $location, RootFactory, $rootScope, apiUrl) {
    console.log('HomeCtrl Here');
  
    var relationship;
    $scope.sent_request = false;

    $http({
        url: `${apiUrl}/users/current`,
        headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
    })
    .then( (profile) => {
        // before i do all this... shouldn't i check if i am in a relationship? since
        // i can't do these features w/o it
        profile = profile.data;

        console.log(profile);
        $scope.profile = profile;
        $scope.messages = profile.messages;
        $scope.calendar = profile.calendar;
        $scope.moreinfo = profile.profile;

});

});

