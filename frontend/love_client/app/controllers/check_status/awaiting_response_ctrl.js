'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, 
    RootFactory, $state, apiUrl, profile) {
    
    console.log('Awaiting Response Here');

    $scope.cancelPartnerReq = () => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/relationships/` + $scope.profile.relationship.id,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
        }).then(() => {
           $state.reload();
        });
    };

});