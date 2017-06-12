'use strict';

app.controller('AwaitingResponseCtrl', function($scope, $http, $location, $rootScope, RootFactory, apiUrl) {
	$scope.profile = $rootScope.profile;

	// should give info on partner?
	$scope.requested_partner_id = $scope.profile.relationship.partner;

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