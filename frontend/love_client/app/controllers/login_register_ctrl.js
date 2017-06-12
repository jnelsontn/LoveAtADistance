'use strict';

app.controller('LoginCtrl', function($scope, $http, $state, RootFactory, apiUrl) {
    console.log('LoginCtrl Here');

  $scope.user = {
    first_name: "Jordan",
    last_name: "Nelson",
    email: "me@me.com",
    username: "jordan",
    password: "catsgowalking"
  };

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
                    $state.go('find_partner');
                    console.log('token ', res.data.token);
                }
        }, console.error );
    };

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
                $state.go('check');
                console.log('token: ', res.data.token);
            }
        }, console.error );
    };

}); // end LoginCtrl




