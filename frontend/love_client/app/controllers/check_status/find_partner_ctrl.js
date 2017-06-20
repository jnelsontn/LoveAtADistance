'use strict';

app.controller('FindPartnerCtrl', function($scope, $http,
    $state, RootFactory, apiUrl, profile) {

    console.log('FindPartnerCtrl Here');
    
    $scope.search_performed = false;

    $scope.search = () => {
        $http({
            url: `${apiUrl}/limited/?email=` + $scope.email,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            }
        }).then((res) => {
            $scope.search_performed = true;
            res = res.data.results;
            $scope.results = res;
            console.log(res);
        });
    };

    $scope.sendPartnerReq = (partner) => {
        $http({
            method: 'POST',
            url: `${apiUrl}/relationships/`,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 'partner': partner }
        }).then((res) => {
        	$scope.response = 'Request Sent Successfully';
        	console.log(res.data);
        });
    };

    $scope.acceptRequest = (id) => {
        $http({
            method: 'POST',
            url: `${apiUrl}/relationships/`,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 'partner': id }
        }).then(() => { 
            $http({
                method: 'DELETE',
                url: `${apiUrl}/notifications/` + $scope.profile.notifications.id,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            }).then(() => {
                $state.reload();
            });
            $state.go('login_register');
        });
    };

    $scope.denyRequest = (id) => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/notifications/` + $scope.profile.notifications.id,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
        }).then(() => {
            $scope.relationship_request = false;
            $state.reload();
        });
    };

});
