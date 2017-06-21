'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, 
    RootFactory, $state, apiUrl, profile) {

    // User can cancel a request they have made
    $scope.cancelPartnerReq = () => {
        $http({
            url: `${apiUrl}/relationships/` + $scope.profile.relationship.id + '/',
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
            }, function() {
                // the action should be the same whether the notification
                // is there or not
                $state.go('check.find_partner');
            });
        });
    };

});