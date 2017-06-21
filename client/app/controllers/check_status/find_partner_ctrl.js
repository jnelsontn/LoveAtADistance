'use strict';

app.controller('FindPartnerCtrl', function($scope, $http,
    $state, $timeout, ProfileFactory, RootFactory, apiUrl,
    profile) {

    console.log('FindPartnerCtrl Here');
    
    $scope.search_performed = false;

    // Search for a user by their e-mail address and display the
    // results
    $scope.searchEmail = () => {
        $http({
            url: `${apiUrl}/limited/?email=` + $scope.email,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((res) => {
            res = res.data.results;
            $scope.search_performed = true;
            $scope.results = res;
        });
    };

    // Send a request to the other party for a relationship
    $scope.sendPartnerReq = (partner) => {
        $http({
            method: 'POST',
            url: `${apiUrl}/relationships/`,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 'partner': partner }
        }).then(() => {
            let update_profile = ProfileFactory.getApiProfile();
            ProfileFactory.setProfile(update_profile);
            $timeout(() => {
                $state.go('check.awaiting_response');
            }, 200);
        });
    };

    // For accepting requests when recieving a notification
    $scope.acceptRequest = (id) => {
        $http({
            method: 'POST',
            url: `${apiUrl}/relationships/`,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 'partner': id }
        }).then(() => { 
            $http({
                method: 'DELETE',
                url: `${apiUrl}/notifications/` + $scope.profile.notifications.id + '/',
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            });
            $timeout(() => {
                $state.go('home.main');
            }, 100);
        });
    };

    // Denying a recieved request
    $scope.denyRequest = (id) => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/notifications/` + $scope.profile.notifications.id + '/',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
        }).then(() => {
            $scope.partner_request = false;
            $scope.search_section = true;
        });
    };

});
