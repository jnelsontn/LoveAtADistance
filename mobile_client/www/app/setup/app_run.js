'use strict';

app.run(($ionicPlatform, $cookies, RootFactory) => {

	$ionicPlatform.ready(() => {
		console.log('ionic here');
	    // if (window.cordova && window.cordova.plugins.Keyboard) {
	    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    //   cordova.plugins.Keyboard.disableScroll(true);
	    // }
	    // if (window.StatusBar) {
	    //   StatusBar.styleDefault();
	    // }
  	});

    let cookie = $cookies.get('authtoken');
    if (cookie) {
    	console.log('have cookie');
        RootFactory.setToken(cookie);
    }

});

