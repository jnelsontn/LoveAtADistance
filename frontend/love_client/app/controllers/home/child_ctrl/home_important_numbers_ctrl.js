'use strict';

app.controller('ImportantNumbersCtrl', function($scope, $http,
    RootFactory, apiUrl, profile, partner) {

    console.log('ImportantNumbers Here');

    $scope.profile = profile;
    $scope.partner = partner;

    $scope.numbers = profile.numbers;
    $scope.partner_numbers = partner.numbers;

    $scope.removeContact = (id) => {
        $http({
            url: `${apiUrl}/numbers/` + id,
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then(() => {

            $http({
                url: `${apiUrl}/numbers/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_numbers) => {
                updated_numbers = updated_numbers.data.results;
                $scope.numbers = updated_numbers;
            });

        });
    };

    $scope.addContact = () => {
        $http({
            url: `${apiUrl}/numbers/`,
            method: 'POST',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'important_name': $scope.important_name,
                'important_number': $scope.important_number
            }
        }).then((server_response) => {
            console.log('server response: ', server_response.data);
            $scope.important_name = '';
            $scope.important_number = '';
            
            $http({
                url: `${apiUrl}/numbers/`,
                headers: { 
                    'Authorization': 'Token ' + RootFactory.getToken() 
                },
            })
            .then((updated_numbers) => {
                updated_numbers = updated_numbers.data.results;
                $scope.numbers = updated_numbers;
            });
        });
    };


});