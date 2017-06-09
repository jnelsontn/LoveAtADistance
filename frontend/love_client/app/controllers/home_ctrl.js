'use strict';

app.controller('HomeCtrl', function($scope, $http, $location, RootFactory, apiUrl) {
    console.log('HomeCtrl Here');

	console.log ('Do we have a token: ', RootFactory.getToken() );

});