'use strict';

app.controller('MessageCtrl', function($scope, $http, 
    messages, apiUrl, RootFactory) {

    // display the list of messages by default
    $scope.status = { isFirstOpen: true };

    $scope.messages = messages;
    $scope.partner_messages = $scope.partner.messages;

    // remove a specific message from the list (if the user's)
    $scope.removeMessage = (id) => {
        $http({
            url: `${apiUrl}/messages/` + id + '/',
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then(() => {

            $http({
                url: `${apiUrl}/messages/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_messages) => {
                updated_messages = updated_messages.data.results;
                $scope.messages = updated_messages;
            });
        });
    };

    // add a message to the user's list of messages
    $scope.addMessage = () => {
        $http({
            url: `${apiUrl}/messages/`,
            method: 'POST',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 'message': $scope.message }
        }).then((server_response) => {
            $scope.message = '';
            
            $http({
                url: `${apiUrl}/messages/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_messages) => {
                updated_messages = updated_messages.data.results;
                $scope.messages = updated_messages;
            });
        }, function(data) {
            console.log('your message cannot be blank');
        });
    };

});