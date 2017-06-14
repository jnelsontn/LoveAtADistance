'use strict';

app.controller('CheckStatusCtrl', function($scope, $http, $state, RootFactory, apiUrl, profile) {
    console.log('CheckStatusCtrl Here');

    console.log('Resolved Profile:', profile);
    $scope.profile = profile;
    // 1. check if user is in a relationship, if not, go find a partner
    if (profile.relationship === null) {
    	$state.go('find_partner');
    // 2. if user is in a relationship, let's continue
    } else if (profile.relationship !== null) {
        let relationship = profile.relationship.partner;
        console.log('partner id', relationship);
        $http({ // 3. check the relationship against the person they sent the request to
            url: `${apiUrl}/relcheck/` + relationship,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then( (bae) => {
            bae = bae.data;
            console.log(bae);
            // 3. check if the requestee is in a relationship
            // 3a. no, they are not.
            if (bae.relationship === null) {
                console.log('you sent response but were waiting');
                $state.go('waiting');
            // 3b. if their status is not null, are they in relationship with us?
            } else if (bae.relationship.partner ===  profile.id) {
                $state.go('home');
                console.log('we have a match');
            // what if they are in a relationship just not with us? 
            // what if i sent a request and they didn't respond?
            } else if (relationship && (bae.relationship.partner !== profile.id)) {
                console.log('you sent a request but it does not match them, should not happen');
                return;
            }
        });
    }
});