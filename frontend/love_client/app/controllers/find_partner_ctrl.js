'use strict';

app.controller('FindPartnerCtrl', function($scope, $http, $location, $rootScope, RootFactory, apiUrl) {

    $scope.search_performed = false;

    $scope.search = () => {
        $http({
            url: `${apiUrl}/limited_norel/?email=` + $scope.email,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((res) => {
            res = res.data;
            $scope.results = res;
            $scope.search_performed = true;
            console.log(res);
        });
    };

    $scope.sendPartnerReq = (partner) => {
        $http({
            method: 'POST',
            url: `${apiUrl}/relationships/`,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() },
            contentType: 'application/json',
            data: { 'partner': partner }
        }).then( (response) => {
        	if (response.data) {
        		$scope.response = 'Request Sent Successfully';
        	}
        	console.log(response.data);
        });
    };

});
