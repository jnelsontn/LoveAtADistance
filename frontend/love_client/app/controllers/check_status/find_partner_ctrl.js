'use strict';

app.controller('FindPartnerCtrl', function($scope, $http, RootFactory, 
    apiUrl, profile) {
    console.log('FindPartnerCtrl Here');
    
    $scope.search_performed = false;

    $scope.search = () => {
        $http({
            url: `${apiUrl}/limited_norel/?email=` + $scope.email,
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            }
        }).then((res) => {
            res = res.data.results;
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
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 'partner': partner }
        }).then((response) => {
        	$scope.response = 'Request Sent Successfully';
        	console.log(response.data);
        });
    };

});
