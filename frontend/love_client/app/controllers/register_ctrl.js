'use strict';

app.controller('RegisterCtrl', function($scope, $http, $location, RootFactory, apiUrl) {
    console.log('RegisterCtrl Here');

    console.log ('Do we have a token: ', RootFactory.getToken() );

    $scope.user = {};

    $scope.register = () => {
            $http({
                url: `${apiUrl}/register/`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            data: {
                'username': $scope.user.username,
                'password': $scope.user.password,
                'email': $scope.user.email,
                'first_name': $scope.user.first_name,
                'last_name': $scope.user.last_name
            }
        }).then(res => {
            RootFactory.setToken(res.data.token);
                if (res.data.token !== '') {
                    // $location.path('/');
                    console.log('user', res.data.user);
                    console.log('profile', res.data.profile);
                    console.log('token ', res.data.token);
                }
        }, console.error );
    };

}); // end RegisterCtrl

