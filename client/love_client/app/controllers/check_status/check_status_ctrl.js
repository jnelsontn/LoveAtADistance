'use strict';

app.controller('CheckStatusCtrl', function($scope, $http,
    $state, $cookies, $timeout, RootFactory, apiUrl, 
    profile) {

    console.log('CheckStatusCtrl Here');

    $scope.profile = profile;
    $scope.partner_request = false;
    $scope.search_section = true;

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
    }

    if ($scope.profile.relationship) {
        $http({ 
            url: `${apiUrl}/relcheck/` + $scope.profile.relationship.partner + '/',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then((prospective_partner) => {
            prospective_partner = prospective_partner.data;
            if (!prospective_partner.relationship) {
                $timeout(() => {
                    $state.go('check.awaiting_response');
                }, 100);
            } else if (prospective_partner.relationship.partner ===  profile.id) {
                $timeout(() => {
                    $state.go('home.main');
                }, 100);
            }
        });
    } else {
        $timeout(() => {
            $state.go('check.find_partner');
        }, 100);
    }

});