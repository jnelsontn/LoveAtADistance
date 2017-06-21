'use strict';

app.run(($cookies, RootFactory) => {

    let cookie = $cookies.get('authtoken');
    if (cookie) {
        RootFactory.setToken(cookie);
    }

});

