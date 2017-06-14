'use strict';

app.factory('RootFactory', ($http, apiUrl) => {
    let secure_token = null;

    return {
        getApiRoot () {
            return $http({
                url: apiUrl,
                headers: {
                    'Authorization': 'Token ' + secure_token
                }
            }).then(res => res.data);
        }, setToken (token) {
            secure_token = token;
        }, getToken () {
            return secure_token;
        }
    };

}); // end RootFactory

app.factory('ProfileFactory', ($http, apiUrl, RootFactory) => {
    let current_profile = null;

    return {
        getApiProfile () {
            return $http({
                url: `${apiUrl}/users/current`,
                headers: {
                    'Authorization': 'Token ' + RootFactory.getToken()
                }
            }).then(res => res.data);
        }, setProfile (profile) {
            current_profile = profile;
        }, getProfile () {
            return current_profile;
        }
    };

}); // end RootFactory