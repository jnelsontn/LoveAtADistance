'use strict';

app.controller('HomeNavBarCtrl', function($scope, 
    $state, $cookies) {

	// on user logout, remove the cookie
    $scope.logOut = () => {
    	$cookies.remove('authtoken');
    	$state.go('login_register.login');
    	$state.reload();
    };

}); // end controller
