'use strict';

app.controller('FindPartnerCtrl', function($scope, $http, $location, RootFactory, $rootScope, apiUrl) {

	$http({
		url: `${apiUrl}/norelationship/`,
		headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
	}).then( (users) => {
		users = users.data;
		console.log(users);
		$scope.users = users;
	});

});