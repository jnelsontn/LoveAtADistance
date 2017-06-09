'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, RootFactory, apiUrl) {
    console.log('LoginCtrl Here');

    console.log ('Do we have a token: ', RootFactory.getToken() );

    $scope.login = () => {
        $http({
            url: `${apiUrl}/api-token/`,
            method: 'POST',
            data: {
                'username': $scope.user.username,
                'password': $scope.user.password
            }
        }).then(res => {
          RootFactory.setToken(res.data.token);
            if (res.data.token !== '') {
                // $location.path('/');
                console.log('user: ', res.data.user);
                console.log('profile', res.data.profile);
                console.log('token: ', res.data.token);
            }
        }, console.error );
    };

}); // end LoginCtrl