'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, 
    RootFactory, $state, apiUrl, profile) {
    
    console.log('Awaiting Response Here');

    $scope.cancelPartnerReq = () => {
        $http({
            url: `${apiUrl}/relationships/` + profile.relationship.id + '/',
            method: 'DELETE',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
        }).then(() => {
            $http({
                url: `${apiUrl}/notifications/` + $scope.profile.id + '/',
                method: 'DELETE',
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            }).then(() => {
                $state.go('check.find_partner');
            }, function(data) {
                $state.go('check.find_partner');
            });
        });
    };

});