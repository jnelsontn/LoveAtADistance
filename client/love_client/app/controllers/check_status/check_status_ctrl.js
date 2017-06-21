'use strict';

app.controller('CheckStatusCtrl', function($scope, $http,
    $state, $cookies, $timeout, RootFactory, apiUrl, 
    profile) {

    console.log('CheckStatusCtrl Here');
    console.log(profile);
    $scope.partner_request = false;
    $scope.search_section = true;
    $scope.profile = profile;

    console.log('check profile: ', $scope.profile);

    $scope.logOut = () => {
        $cookies.remove('authtoken');
        $state.go('login_register.login');
        $state.reload();
    };

    if ($scope.profile.notifications) {
        $http({
            url: `${apiUrl}/notifications/` + $scope.profile.notifications.id + '/',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((requestor) => {
            $scope.requestor = requestor.data.from_user;
            $scope.search_section = false;

            $http({
                url: `${apiUrl}/limited/?pk=` + $scope.requestor,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
            }).then((requestor_info) => {
                $scope.who_is_the_requestor = requestor_info.data.results;

                if ($scope.who_is_the_requestor) {
                    $scope.partner_request = true;
                }
            });
        });
    } // end notification code

    // relationship checking: after a succesful login, we check to see whether the user is in
    // a relationship. If not, they are given the option to search (via email) for a partner.
    // If so, they will be brought to their dashboard.

    // Steps:
    // 1. Check if the User is in a relationship, if not, they'll go to the 'find_partner' state.
    if (profile.relationship === null) {
        $timeout(() => {
            $state.go('check.find_partner');
        }, 300);
    // 2. otherwise, if it is not null, we see who the other user is.
    } else if (profile.relationship) {

        // 3. We check the Id of the relationship on the user's profile
        $http({ 
            url: `${apiUrl}/relcheck/` + $scope.profile.relationship.partner + '/',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((prospective_partner) => {
            prospective_partner = prospective_partner.data;
            // 4. If they are not, either, the user is waiting for a response or their
            // request was ignored.
            if (prospective_partner.relationship === null) {
                $timeout(() => {
                    $state.go('check.awaiting_response');
                }, 300);
            // 3b. If their status is not null, then they are in a relationship with someone
            // just not this user.
            } else if (prospective_partner.relationship.partner ===  profile.id) {
            // 4. A match has been found, the user is brought to the dashboard.
                $timeout(() => {
                    $state.go('home.main');
                }, 300);
            }
        });
    }

});