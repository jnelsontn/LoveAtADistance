'use strict';

app.controller('LoginCtrl', function($scope, $cookies, $http, 
    $state, RootFactory, apiUrl) {

    $state.go('login_register.login');

    $scope.register = () => {
            $http({
                url: `${apiUrl}/register/`,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
                    $state.go('check');
                    $cookies.put('authtoken', res.data.token);
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
                $cookies.put('authtoken', res.data.token);
            }
        });
    };

}); // end LoginCtrl




