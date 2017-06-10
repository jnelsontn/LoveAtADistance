'use strict';

app.controller('HomeCtrl', function($scope, $http, $location, RootFactory, $rootScope, apiUrl) {
    console.log('HomeCtrl Here');
  
    var relationship;

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

        // clean code practices
        if (profile.relationship !== null) {
            relationship = profile.relationship.partner;
            $http({
                url: `${apiUrl}/limitedusers/` + relationship,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
            }).then( (bae) => {
                bae = bae.data;
                console.log(bae);
                if (bae.relationship === null || undefined) {
                    console.log('no dont think so');
                } else if (bae.relationship.partner ===  $scope.profile.id) {
                    $scope.relationship = true;
                    console.log('we have match');
                } else {
                    console.log('no idea but this aint happening');
                }
            }).then( () => {
                if ($scope.relationship) {
                    console.log($scope.relationship);
                    $http({
                        url: `${apiUrl}/users/` + relationship,
                        headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
                    }).then( (x) => {
                        x = x.data;
                        console.log(x);
                        $scope.partner = x;
                        }
                    );
                    console.log('third hit');
                }

            });
        }

    }).then( () => console.log('bye bye') );


});





