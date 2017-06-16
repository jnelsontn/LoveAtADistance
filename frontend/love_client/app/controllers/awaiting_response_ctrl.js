'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, RootFactory, apiUrl, profile) {
    console.log('Awaiting Here');

    $scope.cancelPartnerReq = (partner) => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/relationships/` + $scope.profile.relationship.id,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
        }).then((res) => {
            // Update the Dom to let the user know the cancel request was successful
        	if (res.data) { $scope.response = 'Successfully Canceled Request'; }
        	console.log(res.data);
        });
    };


});