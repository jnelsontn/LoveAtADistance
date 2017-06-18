'use strict';

app.controller('CheckStatusCtrl', function($scope, $http, $state, RootFactory, apiUrl,
 MsgFactory, notifications, profile) {

    console.log('CheckStatusCtrl Here');

    // 'notifications' and 'profile' are called from app.js/ui.router. The data
    // resolves before the page loads. We only use 'notifications' to check the length
    // of our notifications which must be >0. Otherwise, all data needed is already
    // attached to our user's profile.

    $scope.profile = profile;
    $scope.notifications = notifications;
    console.log('check profile: ', profile);

    if ((notifications.length > 0)) {
        // If the (current user) has a notification, it is a request for a relationship. The ID of 
        // the requestor is attached, so we call the API and get a limited set of information back
        // to display to the current user.
        $http({
            url: `${apiUrl}/limited_norel/?pk=` + profile.notifications.from_user,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((requestor) => {
            $scope.requestor = requestor.data;
            console.log('requested from', $scope.requestor);

            // the user can accept or reject the request. an accept, creates the relationship as the
            // inverse of the request; therefore the fields criss-cross thus 'matching'. Either way,
            // we set the notification to 1 (when a choice is made), which is 'viewed' 
            // and therefore, never shown again.
            $scope.acceptRequest = () => {
                $http({
                    method: 'POST',
                    url: `${apiUrl}/relationships/`,
                    headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
                    data: { 'partner': profile.notifications.from_user }
                }).then( (res) => { console.log('res', res.data); });
                    MsgFactory.markMsgRead( profile.notifications.id ).then( (x) => {
                        // We cannot go straight to the home state as the user's profile
                        // must be reloaded.
                        $state.go('login_register');
                    });
            };

            $scope.denyRequest = () => {
                MsgFactory.markMsgRead( profile.notifications.id ).then( (x) => {
                    console.log('an alert will go here');
                });
            };
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
        let relationship = profile.relationship.partner;
        console.log('partner id: ', relationship);
        // 3. We check the Id of the relationship on the user's profile
        $http({ 
            url: `${apiUrl}/relcheck/` + relationship,
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((prospective_partner) => {
            prospective_partner = prospective_partner.data;
            // 4. If they are not, either, the user is waiting for a response or their
            // request was ignored.
            if (prospective_partner.relationship === null) {
                console.log('you sent response but were waiting... or they ignored you');
                $state.go('waiting');
            // 3b. If their status is not null, then they are in a relationship with someone
            // just not this user.
            } else if (prospective_partner.relationship.partner !== profile.id) {
                console.log('you should cancel this req looks like they are in a relationship now');
            } else if (prospective_partner.relationship.partner ===  profile.id) {
            // 4. A match has been found, the user is brought to the dashboard.
                $state.go('home');
            } else if (relationship && (prospective_partner.relationship.partner !== profile.id)) {
                // we should not get to this point
                return;
            }
        });
    }

});