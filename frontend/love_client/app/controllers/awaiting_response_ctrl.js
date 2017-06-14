'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, RootFactory, apiUrl, profile) {
    console.log('Awaiting Here');

    console.log('did waiting get from checking...', profile);

    $scope.cancelPartnerReq = (partner) => {
        $http({
            method: 'DELETE',
            url: `${apiUrl}/relationships/` + $scope.profile.relationship.id,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
        }).then( (response) => { // no response but deletes...
        	if (response.data) {
        		$scope.response = 'Successfully Canceled Request';
        	}
        	console.log(response.data);
        });
    };


});