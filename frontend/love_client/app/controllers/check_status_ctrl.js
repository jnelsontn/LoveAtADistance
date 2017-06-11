'use strict';

app.controller('CheckStatusCtrl', function($scope, $http, $location, RootFactory, $state, apiUrl) {
    console.log('CheckStatusCtrl Here');

    var relationship;

    $http({
        url: `${apiUrl}/users/current`,
        headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
    }).then( (profile) => {
    	console.log(profile);
    	profile = profile.data;
    	
    	if (profile.relationship === null) {
    		$state.go('find_partner');
    	} else if (profile.relationship !== null)

            relationship = profile.relationship.partner;
            $http({
                url: `${apiUrl}/limitedusers/` + relationship,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
            }).then( (bae) => {
                bae = bae.data;
                console.log(bae);
                // 3. check if the requestee is in a relationship
                // 3a. no, they are not.
                if (bae.relationship === null) {
                    console.log('no dont think so');
                    // sent request but they didn't respond so lets scope it
                    $scope.sent_request = true;
                    $state.go('waiting');
                    return;
                // 3b. if their status is not null, are they in relationship with us?
                } else if (bae.relationship.partner ===  profile.id) {
                    // yes, looks like it.
                    $scope.relationship = true;
                    $state.go('home');
                    console.log('we have a match');
                // what if they are in a relationship just not with us? 
                // what if i sent a request and they didn't respond?
                } else if (relationship && (bae.relationship.partner !== $scope.profile.id)) {
                    console.log('no idea but this aint happening');
                    return;
                }
            });
        });


});