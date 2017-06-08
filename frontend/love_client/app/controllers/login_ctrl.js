'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, RootFactory, apiUrl) {
    console.log('LoginCtrl Here');

    $scope.login = () => {
        $http({
            url: `${apiUrl}/api-token-auth/`,
            method: 'POST',
            data: {
                'username': $scope.user.username,
                'password': $scope.user.password
            }
        }).then(res => {
          RootFactory.setToken(res.data.token);
            if (res.data.token !== '') {
                $location.path('/test');
                console.log('loginctrl: got token ', res.data.token);
            }
        }, console.error );
    };

}); // end LoginCtrl