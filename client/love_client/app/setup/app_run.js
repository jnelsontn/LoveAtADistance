'use strict';

app.run(($cookies, RootFactory) => {

    let cookie = $cookies.get('authtoken');
    if (cookie) {
        console.log('You have a cookie', cookie);
        RootFactory.setToken(cookie);
    }

});

