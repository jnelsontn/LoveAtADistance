'use strict';

app.controller('CheckStatusCtrl', function($scope, $http,
    $state, RootFactory, apiUrl, profile) {

    console.log('CheckStatusCtrl Here');

    $scope.relationship_request = false;
    $scope.profile = profile;

    console.log('check profile: ', profile);

    if ((profile.notifications !== null)) {
        $http({
            url: `${apiUrl}/notifications/` + profile.notifications.id,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((requestor) => {
            $scope.requestor = requestor.data.from_user;

            $http({
                url: `${apiUrl}/limited/?pk=` + $scope.requestor,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
            }).then((requestor_info) => {
                $scope.who_is_the_requestor = requestor_info.data.results;
                if ($scope.who_is_the_requestor !== null) {
                    $scope.relationship_request = true;
                }
                console.log('requestors info is: ', $scope.who_is_the_requestor);
            });
        });
    } // end notification code

    // relationship checking: after a succesful login, we check to see whether the user is in
    // a relationship. If not, they are given the option to search (via email) for a partner.
    // If so, they will be brought to their dashboard.

    // Steps:
    // 1. Check if the User is in a relationship, if not, they'll go to the 'find_partner' state.
    if (profile.relationship === null) {
    	$state.go('find_partner');
    // 2. otherwise, if it is not null, we see who the other user is.
    } else if (profile.relationship !== null) {

        console.log('partner id: ', profile.relationship.partner);
        // 3. We check the Id of the relationship on the user's profile
        $http({ 
            url: `${apiUrl}/relcheck/` + profile.relationship.partner,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((prospective_partner) => {
            prospective_partner = prospective_partner.data;
            console.log(prospective_partner);
            // 4. If they are not, either, the user is waiting for a response or their
            // request was ignored.
            if (prospective_partner.relationship === null) {
                console.log('you sent response but were waiting... or they ignored you');
                $state.go('awaiting_response');
            // 3b. If their status is not null, then they are in a relationship with someone
            // just not this user.
            } else if (prospective_partner.relationship.partner !== profile.id) {
                console.log('you should cancel this req looks like they are in a relationship now');
            } else if (prospective_partner.relationship.partner ===  profile.id) {
            // 4. A match has been found, the user is brought to the dashboard.
                $state.go('home.main');
            }
        });
    }

});